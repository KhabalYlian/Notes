import { forwardRef } from 'react';

import cn from 'classnames';
//import ContentEditable from 'react-contenteditable';
import ContentEditable from '../../helpers/ContentEditable/ContentEditable';

export const EditableInput = forwardRef((props, ref) => {
    return (
        <ContentEditable
			style={{cursor: 'text'}}
            ref={ref}
            {...props}
            className={cn(props.className, {
                ...props.classnameoption
            })}
        />
    );
});
