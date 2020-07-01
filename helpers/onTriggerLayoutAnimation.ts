import { LayoutAnimation, UIManager } from 'react-native';

const triggerLayoutAnimation = () => {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
}

export default triggerLayoutAnimation;