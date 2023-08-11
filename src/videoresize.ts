/**
 * @module video/videoresize
 */
import { Plugin } from '@ckeditor/ckeditor5-core';
import VideoResizeEditing from "./videoresize/videoresizeediting";
import VideoResizeHandles from "./videoresize/videoresizehandles";
import VideoResizeButtons from "./videoresize/videoresizebuttons";
import './theme/videoresize.css';

export default class VideoResize extends Plugin {
    /**
     * @inheritDoc
     */
    public static get requires() {
        return [VideoResizeEditing, VideoResizeHandles, VideoResizeButtons] as const;
    }

    /**
     * @inheritDoc
     */
    public static get pluginName() {
        return 'VideoResize' as const;
    }
}
