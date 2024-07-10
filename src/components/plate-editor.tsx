'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@udecode/cn';
import { CommentsProvider } from '@udecode/plate-comments';
import { createPlateEditor, getNode, Plate, useEditorState } from '@udecode/plate-common';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { commentsUsers, myUserId } from '@/lib/plate/comments';
import { MENTIONABLES } from '@/lib/plate/mentionables';
import { plugins } from '@/lib/plate/plate-plugins';
import { CommentsPopover } from '@/components/plate-ui/comments-popover';
import { CursorOverlay } from '@/components/plate-ui/cursor-overlay';
import { Editor } from '@/components/plate-ui/editor';
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons';
import { MentionCombobox } from '@/components/plate-ui/mention-combobox';
import { serializeHtml } from '@udecode/plate-serializer-html';
import { ErrorBoundary } from 'react-error-boundary';

interface ISerializedHtmlProps {
  onError: (error: boolean) => void;
}

const temporaryEditor = createPlateEditor({ plugins });

export const SerializedHtml = ({ onError }: ISerializedHtmlProps) => {
  const editor = useEditorState();
  let html;
  try {
    html = serializeHtml(editor, {
      nodes: editor.children
    });
    onError(false);
  } catch (err) {
    html = '';
    onError(true);
  }
  return <div>{html}</div>
};

const getNodesFromEditor = (editorValue: any[]) => {
  return editorValue.map((item: any) => item.children?.length > 0 ? item.children[0] : null).filter(Boolean);
};

interface IPlateEditorProps {
  exportTriggered?: number;
  handleGenerateContent?: (contentHtml: string, contentValues: any[]) => void;
  editorValue?: any[];
  initialValue?: any;
};

export function EditorCallback({ exportTriggered, handleGenerateContent, editorValue }: IPlateEditorProps) {
  const [lastExportTriggered, setLastExportTriggered] = useState(0);
  const editor = useEditorState();
  const contentHtml = serializeHtml(temporaryEditor, { nodes: lastExportTriggered !== exportTriggered ? getNodesFromEditor(editorValue || []) : [] });

  useEffect(() => {
    if (handleGenerateContent && exportTriggered !== lastExportTriggered) {
      handleGenerateContent(contentHtml, editorValue || []);
    }
    if (exportTriggered) {
      setLastExportTriggered(exportTriggered);
    }
  }, [exportTriggered]);

  return null;
}

export default function PlateEditor(props: IPlateEditorProps) {
  const containerRef = useRef(null);
  const [editorValue, setEditorValue] = useState<any[]>([]);

  const onPlateChange = (value: any[]) => {
    setEditorValue(value);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {/* <CommentsProvider users={commentsUsers} myUserId={myUserId}> */}
        <Plate plugins={plugins} initialValue={props.initialValue} onChange={onPlateChange}>
          <EditorCallback editorValue={editorValue} {...props} />
          <div
            ref={containerRef}
            className={cn(
              'relative',
              // Block selection
              '[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4'
            )}
          >
            <FixedToolbar>
              <FixedToolbarButtons />
            </FixedToolbar>

            <Editor
              className="px-[96px] py-16"
              autoFocus
              focusRing={false}
              variant="ghost"
              size="md"
            />

            <FloatingToolbar>
              <FloatingToolbarButtons />
            </FloatingToolbar>

            <MentionCombobox items={MENTIONABLES} />

            <CommentsPopover />

            <CursorOverlay containerRef={containerRef} />
          </div>
        </Plate>
      {/* </CommentsProvider> */}
    </DndProvider>
  );
}
