// @flow
import * as React from 'react';
import styled from 'styled-components';
import { blockTypes, createBlock } from '@seine/core';
import { ActionButton } from '@seine/ui';
import {
  Button,
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
} from '@material-ui/core';
import type { Block, BlocksAction, BlocksCreateAction } from '@seine/core';

const FileInput = styled.input.attrs(() => ({ type: 'file' }))`
  display: none;
`;

const defaultOnUpload = (formData) =>
  new Promise((resolve, reject) => {
    const file = formData.get('file');
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve({ file: reader.result });
    reader.onerror = (error) => reject(error);
  });

export type Props = $Rest<BlocksCreateAction, {| block: Block |}> & {
  children?: React.Node,
  dispatch: (BlocksAction) => any,
  onUpload?: (FormData) => Promise<{ file: string }>,
  title?: string,
};

/**
 * @description Action button to create bar chart block.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ImageBlockAddButton({
  children = 'Image',
  dispatch,
  onUpload = defaultOnUpload,
  ...buttonProps
}: Props) {
  const [action, setAction] = React.useState(null);
  const [file, setFile] = React.useState(null);

  React.useEffect(() => {
    if (action && file) {
      const formData = new FormData();
      formData.append('file', file);
      onUpload(formData).then(({ file }) => {
        dispatch({
          ...action,
          block: {
            ...action.block,
            body: { ...action.body, file },
          },
        });
        setAction(null);
      });
    }
  }, [action, dispatch, file, onUpload]);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <Box onClick={React.useCallback((event) => event.stopPropagation(), [])}>
      <ActionButton
        {...buttonProps}
        block={React.useMemo(
          () =>
            createBlock(blockTypes.IMAGE, { file: null }, { align: 'middle' }),
          []
        )}
        dispatch={setAction}
      >
        {children}
      </ActionButton>

      <Dialog
        open={action !== null}
        onClose={React.useCallback(() => setAction(null), [setAction])}
        keepMounted
      >
        <FileInput
          ref={fileInputRef}
          onChange={React.useCallback(
            (event: SyntheticInputEvent<HTMLInputElement>) => {
              event.preventDefault();
              setFile(event.currentTarget.files[0]);
            },
            [setFile]
          )}
        />
        <DialogActions>
          <Button
            disabled={!!(action && file)}
            type={'button'}
            onClick={React.useCallback(
              (event: SyntheticInputEvent<HTMLInputElement>) => {
                event.preventDefault();
                if (fileInputRef.current !== null) {
                  fileInputRef.current.click();
                }
              },
              []
            )}
          >
            {action && file ? (
              <CircularProgress disableShrink />
            ) : (
              'Click to upload'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
