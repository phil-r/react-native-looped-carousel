declare module "react-native-looped-carousel" {

	import * as React from 'react';

	export interface LoopedCarouselProperties extends React.Props<LoopedCarousel>{
		autoplay?: boolean,
		delay?: number,
		currentPage?: number,
		style?: React.ViewStyle,
		pageStyle?: React.ViewStyle,
		contentContainerStyle?: React.ViewStyle,
		pageInfo?: boolean,
		pageInfoBackgroundColor?: string,
		pageInfoTextStyle?: React.TextStyle,
		pageInfoTextSeparator?: string,
		bullets?: boolean,
		bulletsContainerStyle?: React.TextStyle,
		bulletStyle?: React.TextStyle,
		arrows?: boolean,
		arrowsContainerStyle?: React.TextStyle,
		arrowstyle?: React.TextStyle,
		leftArrowText?: string,
		rightArrowText?: string,
		chosenBulletStyle?: React.TextStyle,
		onAnimateNextPage?: Function,
	}
	
	export interface LoopedCarouselStatic extends React.NativeMethodsMixin, React.ComponentClass<LoopedCarouselProperties>{}
	
	var LoopedCarousel: LoopedCarouselStatic;
	type LoopedCarousel = LoopedCarouselStatic;

	export default LoopedCarousel;
}