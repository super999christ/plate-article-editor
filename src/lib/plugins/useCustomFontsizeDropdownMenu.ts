import {
  ENode,
  focusEditor,
  getNodeEntries,
  getPluginInjectProps,
  isBlock,
  PlateEditor,
  PlatePluginKey,
  setElements,
  SetNodesOptions,
  TNodeMatch,
  unsetNodes,
  useEditorRef,
  useEditorSelector,
  Value,
} from '@udecode/plate-common';
import { isDefined } from '@udecode/plate-common';
import { fontSizes, KEY_FONTSIZE } from './createCustomFontSizePlugin';

export type FontSize = typeof fontSizes[number];

export const setFontsize = <V extends Value>(
    editor: PlateEditor<V>,
    {
      key = KEY_FONTSIZE,
      setNodesOptions,
      value,
    }: { setNodesOptions?: SetNodesOptions<V>; value: FontSize } & PlatePluginKey
  ) => {
    const { defaultNodeValue, nodeKey, validTypes } = getPluginInjectProps(
      editor,
      key
    );
    const match: TNodeMatch<ENode<Value>> = (n) => {
      return (
        isBlock(editor, n) &&
        !!validTypes &&
        validTypes.includes(n.type as string)
      );
    };
  
    if (value === defaultNodeValue) {
      unsetNodes(editor, nodeKey!, {
        match,
        ...setNodesOptions,
      });
    } else {
      setElements(
        editor,
        { [nodeKey!]: value },
        {
          match: match as any,
          ...setNodesOptions,
        }
      );
    }
  };
  

export const useCustomFontsizeDropdownMenuState = () => {
  const value: FontSize = useEditorSelector((editor) => {
    let commonFontsize: string | undefined;
    const codeBlockEntries = getNodeEntries(editor, {
      match: (n) => isBlock(editor, n),
    });
    const nodes = Array.from(codeBlockEntries);
    nodes.forEach(([node, path]) => {
      const size: string = (node[KEY_FONTSIZE] as string) || '18px';

      if (!isDefined(commonFontsize)) {
        commonFontsize = size;
      } else if (commonFontsize !== size) {
        commonFontsize = undefined;
      }
    });

    if (isDefined(commonFontsize)) {
      const nodeValue = commonFontsize;
      return nodeValue as FontSize;
    }

    return '18px';
  }, []);

  return {
    value,
  };
};

export const useCustomFontsizeDropdownMenu = ({
  value,
}: ReturnType<typeof useCustomFontsizeDropdownMenuState>) => {
  const editor = useEditorRef();

  return {
    radioGroupProps: {
      onValueChange: (newValue: string) => {
        setFontsize(editor, {
          key: KEY_FONTSIZE,
          value: newValue as FontSize,
        });

        focusEditor(editor);
      },
      value,
    },
  };
};