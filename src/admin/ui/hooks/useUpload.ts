import { useCallback, useEffect, useState } from 'react';
import S3 from 'shared/util/S3';
import validateGameState from 'shared/validation/validateGameState';
import { useSelector } from './redux';

export enum UploadState {
  NONE,
  IN_PROGRESS,
  COMPLETE,
  ERROR
}

const useUpload = (filename: string) => {
  const state = useSelector(s => s);
  const [uploadState, setUploadState] = useState(UploadState.NONE);

  useEffect(() => {
    if (uploadState !== UploadState.IN_PROGRESS) {
      setUploadState(UploadState.NONE);
    }
  }, [state]);

  const upload = useCallback(async () => {
    setUploadState(UploadState.IN_PROGRESS);
    try {
      const s3 = new S3(state.gameName);
      validateGameState(state.gameState.present);
      s3.writeObject(filename, JSON.stringify(state.gameState));
      setUploadState(UploadState.COMPLETE);
    } catch (e) {
      setUploadState(UploadState.ERROR);
    }
  }, [filename, state]);

  return { upload, uploadState };
};

export default useUpload;
