import { FileRepository } from '@ckeditor/ckeditor5-upload';
import { Command } from '@ckeditor/ckeditor5-core';
import type VideoUtils from '../videoutils';
import { toArray, type ArrayOrItem } from '@ckeditor/ckeditor5-utils';
import type { Position } from '@ckeditor/ckeditor5-engine';

export default class UploadVideoCommand extends Command {
    /**
     * @inheritDoc
     */
    public override refresh(): void {
        const editor = this.editor;
        const videoUtils: VideoUtils = editor.plugins.get('VideoUtils') as VideoUtils;
        const selectedElement = editor.model.document.selection.getSelectedElement()!;

        this.isEnabled = videoUtils.isVideoAllowed() || videoUtils.isVideo(selectedElement);
    }

    public override execute(options: { file: ArrayOrItem<File> }): void {
        const files = toArray(options.file);
        const selection = this.editor.model.document.selection;
        const videoUtils: VideoUtils = this.editor.plugins.get('VideoUtils') as VideoUtils;
        const selectionAttributes = Object.fromEntries(selection.getAttributes());

        // if (!options.file && !options.files) {
        //     return;
        // }


        files.forEach((file, index) => {
            const selectedElement = selection.getSelectedElement();

            if (index && selectedElement && videoUtils.isVideo(selectedElement)) {
                const position = this.editor.model.createPositionAfter(selectedElement);

                this._uploadVideo(file, selectionAttributes, position);
            } else {
                this._uploadVideo(file, selectionAttributes);
            }
        });
    }

    private _uploadVideo(file: File, attributes: object, position?: Position): void {
        const editor = this.editor;
        const fileRepository = editor.plugins.get(FileRepository);
        const loader = fileRepository.createLoader(file);
        const videoUtils: VideoUtils = editor.plugins.get('VideoUtils') as VideoUtils;

        if (!loader) {
            return;
        }

        videoUtils.insertVideo({ ...attributes, uploadId: loader.id }, position);
    }
}
