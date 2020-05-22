import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { API_BASE } from 'utils/constants';
import { getAuthHeader } from 'utils/auth';
import { FilePond, Doka } from './FilePond';

const OrderDesignUploader = ({ orderId, onUploadComplete }) => {
  const [files, setFiles] = useState([]);

  return (
    <FilePond
      name="order_file"
      files={files}
      acceptedFileTypes={['image/*']}
      fileRenameFunction={(file) => `${new Date().getTime()}${file.extension}`}
      server={{
        url: `${API_BASE}/orders/${orderId}/designs`,
        process: {
          method: 'POST',
          withCredentials: false,
          headers: {
            ...getAuthHeader(),
          },
          onload: null,
          onerror: null,
          ondata: null,
        },
        fetch: null,
        revert: null,
      }}
      instantUpload={false}
      imageEditInstantEdit
      imageEditEditor={Doka.create()}
      imageCropAspectRatio="1:1"
      onupdatefiles={setFiles}
      onprocessfiles={() => {
        setFiles([]);
        onUploadComplete();
      }}
      labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
    />
  );
};

OrderDesignUploader.propTypes = {
  orderId: PropTypes.string.isRequired,
  onUploadComplete: PropTypes.func,
};

OrderDesignUploader.defaultProps = {
  onUploadComplete: () => {},
};

export default OrderDesignUploader;
