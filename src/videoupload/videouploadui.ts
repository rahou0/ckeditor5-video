import { Plugin } from '@ckeditor/ckeditor5-core';
import { FileDialogButtonView } from '@ckeditor/ckeditor5-upload';
import videoUploadIcon from '../theme/icons/video.svg';
import { createVideoTypeRegExp } from "./utils";
import { type Locale } from '@ckeditor/ckeditor5-utils';
import type UploadVideoCommand from './uploadvideocommand';

export default class VideoUploadUI extends Plugin {
    /**
     * @inheritDoc
     */
    public static get pluginName() {
        return 'VideoUploadUI' as const;
    }

    /**
     * @inheritDoc
     */
    public init(): void {
        const editor = this.editor;
        const t = editor.t;

        const componentCreator = (locale: Locale) => {
            const view = new FileDialogButtonView(locale);
            const command: UploadVideoCommand = editor.commands.get('uploadVideo')! as UploadVideoCommand;
            const videoTypes = editor.config.get('video.upload.types')! as Array<any>;
            const videoMediaTypesRegExp = createVideoTypeRegExp(videoTypes);

            view.set({
                acceptedType: videoTypes?.map(type => `video/${type}`)?.join(','),
                allowMultipleFiles: editor.config.get('video.upload.allowMultipleFiles')
            });

            view.buttonView.set({
                label: t('Upload Video'),
                icon: videoUploadIcon,
                tooltip: true
            });


            view.buttonView.bind('isEnabled').to(command);

            view.on('done', (evt, files: FileList) => {
                const videosToUpload = Array.from(files).filter(file => videoMediaTypesRegExp.test(file.type));

                if (videosToUpload.length) {
                    editor.execute('uploadVideo', { files: videosToUpload });
                }
            });

            return view;
        };

        editor.ui.componentFactory.add('uploadVideo', componentCreator);
        editor.ui.componentFactory.add('videoUpload', componentCreator);
    }
}
