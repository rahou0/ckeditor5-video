import { first } from '@ckeditor/ckeditor5-utils';
import type { Editor } from '@ckeditor/ckeditor5-core';

import type {
	MatcherPattern,
	ViewElement,
	DocumentSelection,
	Selection,
	DowncastWriter,
	ViewContainerElement,
	Schema,
} from '@ckeditor/ckeditor5-engine';

import type VideoUtils from '../videoutils';

export function createVideoViewElement(writer: DowncastWriter, videoType: 'videoBlock' | 'videoInline' | null): ViewContainerElement {
	const emptyElement = writer.createEmptyElement('video');

	const container = videoType === 'videoBlock' ?
		writer.createContainerElement('figure', { class: 'video' }) :
		writer.createContainerElement('span', { class: 'video-inline' });

	writer.insert(writer.createPositionAt(container, 0), emptyElement);

	return container;
}

export function getVideoViewElementMatcher(editor: Editor, matchVideoType: 'videoBlock' | 'videoInline'): MatcherPattern {
	const videoUtils: VideoUtils = editor.plugins.get('VideoUtils') as VideoUtils;
	const areBothVideoPluginsLoaded = editor.plugins.has('VideoInlineEditing') && editor.plugins.has('VideoBlockEditing');

	return element => {
		if (!videoUtils.isInlineVideoView(element) || !element.hasAttribute('src')) {
			return null;
		}
		// If just one of the plugins is loaded (block or inline), it will match all kinds of images.
		if (!areBothVideoPluginsLoaded) {
			return getPositiveMatchPattern(element);
		}

		const videoType = element.findAncestor(videoUtils.isBlockVideoView) ? 'videoBlock' : 'videoInline';
		if (videoType !== matchVideoType) {
			return null;
		}
		return getPositiveMatchPattern(element);

	}

	function getPositiveMatchPattern(element: ViewElement) {
		const pattern: Record<string, unknown> = {
			name: true
		};

		// This will trigger src consumption (See https://github.com/ckeditor/ckeditor5/issues/11530).
		if (element.hasAttribute('src')) {
			pattern.attributes = ['src'];
		}

		return pattern;
	}
}

/**
 * @internal
 */
export function determineVideoTypeForInsertionAtSelection(schema: Schema, selection: Selection | DocumentSelection): 'videoBlock' | 'videoInline' {
	const firstBlock = first(selection.getSelectedBlocks());

	if (!firstBlock || schema.isObject(firstBlock)) {
		return 'videoBlock';
	}

	if (firstBlock.isEmpty && firstBlock.name !== 'listItem') {
		return 'videoBlock';
	}

	return 'videoInline';
}
