import type VideoUtils from '../../videoutils';
import type { PositionOptions } from '@ckeditor/ckeditor5-utils';
import type { Editor } from '@ckeditor/ckeditor5-core';
import { BalloonPanelView, type ContextualBalloon } from '@ckeditor/ckeditor5-ui';

export function repositionContextualBalloon(editor: Editor): void {
	const balloon: ContextualBalloon = editor.plugins.get('ContextualBalloon');
	const videoUtils: VideoUtils = editor.plugins.get('VideoUtils') as VideoUtils;

	if (videoUtils.getClosestSelectedVideoWidget(editor.editing.view.document.selection)) {
		const position = getBalloonPositionData(editor);

		balloon.updatePosition(position);
	}
}

export function getBalloonPositionData(editor: Editor): Partial<PositionOptions> {
	const editingView = editor.editing.view;
	const defaultPositions = BalloonPanelView.defaultPositions;
	const videoUtils: VideoUtils = editor.plugins.get('VideoUtils') as VideoUtils;

	return {
		target: editingView.domConverter.viewToDom(videoUtils.getClosestSelectedVideoWidget(editingView.document.selection)!) as HTMLElement,
		positions: [
			defaultPositions.northArrowSouth,
			defaultPositions.northArrowSouthWest,
			defaultPositions.northArrowSouthEast,
			defaultPositions.southArrowNorth,
			defaultPositions.southArrowNorthWest,
			defaultPositions.southArrowNorthEast
		]
	};
}
