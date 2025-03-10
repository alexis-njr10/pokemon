import app from '../app';
import Quill from 'quill';
import ImageUploader from 'quill-image-uploader';
import 'quill/dist/quill.snow.css';
import 'quill-image-uploader/dist/quill.imageUploader.min.css';

Quill.register('modules/imageUploader', ImageUploader);