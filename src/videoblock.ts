import { Plugin } from '@ckeditor/ckeditor5-core';
import { Widget } from '@ckeditor/ckeditor5-widget';

import VideoBlockEditing from './video/videoblockediting';

import './theme/video.css';

export default class VideoBlock extends Plugin {
    /**
	 * @inheritDoc
	 */
    public static get requires() {
        return [ VideoBlockEditing, Widget ] as const;
    }

    /**
	 * @inheritDoc
	 */
    public static get pluginName() {
        return 'VideoBlock' as const;
    }
}
