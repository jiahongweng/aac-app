// Import doka
import * as Doka from 'components/doka/lib/doka.esm.min';
import 'components/doka/lib/doka.min.css';

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';

// Import styles
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.min.css';

// Import plugins
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageFilter from 'filepond-plugin-image-filter';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginImageFilter,
  FilePondPluginImagePreview,
  FilePondPluginImageEdit,
  FilePondPluginImageTransform,
  FilePondPluginFileValidateType,
  FilePondPluginFileRename,
);

export { FilePond, Doka };
