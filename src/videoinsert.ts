/**
 * @module video/videoinsert
 */
import { Plugin } from '@ckeditor/ckeditor5-core';
import VideoUpload from './videoupload';
import VideoInsertUI from './videoinsert/videoinsertui';

export default class VideoInsert extends Plugin {

    /**
     * @inheritDoc
     */
    public static get pluginName() {
        return 'VideoInsert' as const;
    }

    /**
     * @inheritDoc
     */
    public static get requires() {
        return [ VideoUpload, VideoInsertUI ] as const;
    }
}
