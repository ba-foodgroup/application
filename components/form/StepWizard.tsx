import React, { useRef, useState, useEffect } from 'react';
import { View, Easing, Animated } from 'react-native';

/**
 * StepWizard, for å håndtere en stegviser, med forskjellige steg, f.eks i en form.
 * Inspirasjon hentet fra: https://github.com/talut/react-native-wizard
 * IDEA: Støtte flere animasjoner kanskje? Tror ikke det er vits!
 */

interface StepWizardStep {
    content: JSX.Element
};

interface StepWizardStepProps {
    animation: string,
    currentStep: number,
    duration?: number
};

interface StepWizardProps {
    activeStep?: number,
    steps?: StepWizardStep[],
    onPrevious?: () => void,
    onNext?: () => void,
    animationDuration?: number,
    isFirstStep?: (value:boolean) => void,
    isLastStep?: (value:boolean) => void,
    currentStep: (activeStep: number, isFirstStep: boolean, isLastStep: boolean) => void,
    ref?: React.MutableRefObject<object>
};

export interface WizardRefObject {
    next: () => void,
    previous: () => void,
    goto: (step: number) => void
};

const StepWizard: React.FC<StepWizardProps> =
    React.forwardRef((props: StepWizardProps, ref?: React.MutableRefObject<object>) => {
        const {
            activeStep = 0,
            steps,
            onPrevious,
            onNext,
            isFirstStep,
            isLastStep,
            animationDuration = 500,
            currentStep
        } = props;
        const [activeStepIndex, setActiveStep] = useState(activeStep);
        const [isNext, setIsNext] = useState(true);

        ref.current = {
            next: () => {
                if (steps.length - 1 !== activeStepIndex) {
                    setActiveStep(activeStepIndex + 1);
                    setIsNext(true);
                    currentStep(activeStepIndex + 1, activeStepIndex + 1 === 0, activeStepIndex + 1 === steps.length - 1);
                    onNext();
                }
            },
            previous: () => {
                if (activeStepIndex > 0) {
                    setActiveStep(activeStepIndex - 1);
                    setIsNext(false);
                    currentStep(activeStepIndex - 1, activeStepIndex - 1 === 0, activeStepIndex - 1 === steps.length - 1);
                    onPrevious();
                }
            },
            goto: (step: number) => {
                if (step <= steps.length - 1 && step >= 0) {
                    if (activeStepIndex > step) {
                        setIsNext(false);
                        onPrevious();
                    } else {
                        setIsNext(true);
                        onNext();
                    }
                    currentStep(step, step === 0, step !== 0);
                    setActiveStep(step);
                }
            }
        };

        useEffect(() => {
            currentStep(
                activeStepIndex,
                activeStepIndex === 0,
                activeStepIndex === steps.length - 1
            );
        }, [activeStepIndex, steps.length]);

        useEffect(() => {
            isFirstStep(activeStepIndex === 0);
            isLastStep(activeStepIndex === steps.length - 1);
        }, [activeStepIndex, steps.length]);

        return (
            <Step
                currentStep={activeStepIndex}
                duration={animationDuration}
                animation={'fade'}
                content={steps[activeStepIndex].content}
            />
        );
    }
);

const Step: React.FC<StepWizardStepProps & StepWizardStep> = (
    {
        content,
        animation,
        duration,
        currentStep
    }
    ) => {
    const [style, setStyle] = useState({});
    useEffect(() => {
        // Se på andre animasjoner senere I guess, for nå er animasjoner ubrukt
        switch (animation) {
            case 'fade':
            default: {
                const opacity = new Animated.Value(0);
                Animated.timing(opacity, {
                    toValue: 1,
                    duration
                }).start();
                setStyle({ opacity: opacity });
            }
        }
        return () => {
            const opacity = new Animated.Value(1);
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300
            }).start();
        };
    }, [animation, duration, setStyle, currentStep]);

    return (
        <Animated.View style={style}>{content}</Animated.View>
    );
};

export default StepWizard;