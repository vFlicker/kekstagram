import {getPosts} from './api.js';
import {renderPhotos} from './gallery/gallery.js';
import './editor/file-chooser.js';

getPosts()
  .then(renderPhotos);
