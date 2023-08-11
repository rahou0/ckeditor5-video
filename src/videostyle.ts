/**
 * @module video/videostyle
 */
import { Plugin } from '@ckeditor/ckeditor5-core';
import VideoStyleEditing from './videostyle/videostyleediting';
import VideoStyleUI from './videostyle/videostyleui';

export default class VideoStyle extends Plugin {
    /**
     * @inheritDoc
     */
    public static get requires() {
        return [ VideoStyleEditing, VideoStyleUI ] as const;
    }
    /**
     * @inheritDoc
     */
    public static get pluginName() {
        return 'VideoStyle' as const;
    }
}
