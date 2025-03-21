import React, { useEffect, useState } from "react";
// import { EditorState } from 'draft-js';
// import Editor from '@draft-js-plugins/editor';
// import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
// import 'draft-js/dist/Draft.css';
import './DescriptionFieldSet.css';
// import buttonStyles from '../../../elements/editor/buttonStyles.module.css';
// import toolbarStyles from '../../../elements/editor/toolbarStyles.module.css'
import { Tiptap } from "../../../elements/editor/Tiptap";

type Props = {
  data: any;
  onSave: (data: any) => void;
};


export const DescriptionFieldSet = ({ data, onSave }: Props) => {

	const [ inboundContent, setInboundContent ] = useState('<p>Hola</p>');

	const [ content, setContent ] = useState('');

	// const [editorState, setEditorState ] = useState(() => EditorState.createEmpty());

	// const [{ plugins, Toolbar }] = useState(() => {
  //   const toolbarPlugin = createToolbarPlugin({
	// 		theme: { buttonStyles, toolbarStyles }
	// 	});
  //   const { Toolbar } = toolbarPlugin;
  //   const plugins = [toolbarPlugin];
  //   return {
  //     plugins,
  //     Toolbar
  //   };
  // });
	//
	const handleSave = () => {
		console.log('save new description: ', content);
		console.log(onSave);
		const update = { update: {
			description: content
		}};
		onSave(update);
	};

	const onCancel = () => {};

	useEffect(() => {
		if (!data) return;
		console.log('loading data: ', data);
		if (data.description)
			setInboundContent(data.description);
		// setEditorState(data)
	}, [data]);
	
	// const editorRef = useRef(null);

	return (<>
		<div className="description-form">
			<div className="description-editor">
				{/* <Toolbar />
				<Editor
					plugins={plugins}
					editorState={editorState}
					onChange={setEditorState}
					ref={(editor: any) => (editorRef.current = editor)} /> */}
					<Tiptap content={inboundContent} setContent={(content) => setContent(content)}/>
			</div>
			<div className="form-controls">
        <button className="main" onClick={handleSave} >Guardar</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
		</div>
	</>)
}