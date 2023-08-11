import { Plugin } from '@ckeditor/ckeditor5-core';
import VideoBlock from './videoblock';
import VideoInline from './videoinline';
import './theme/video.css';

export default class Video extends Plugin {
    /**
     * @inheritDoc
     */
    public static get requires() {
        return [ VideoBlock, VideoInline] as const;
    }

    /**
     * @inheritDoc
     */
    public static get pluginName() {
        return 'Video' as const;
    }
}
