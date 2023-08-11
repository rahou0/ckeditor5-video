import { Plugin } from '@ckeditor/ckeditor5-core';
import VideoUploadUI from "./videoupload/videouploadui";
import VideoUploadEditing from "./videoupload/videouploadediting";
import VideoUploadProgress from "./videoupload/videouploadprogress";

export default class VideoUpload extends Plugin {
	/**
	 * @inheritDoc
	 */
	public static get pluginName() {
		return 'VideoUpload' as const;
	}

	/**
	 * @inheritDoc
	 */
	public static get requires() {
		return [VideoUploadEditing, VideoUploadUI, VideoUploadProgress] as const;
	}
}
