import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as strings from 'ShowHidePageTitleCommandSetStrings';
import { BaseDialog, IDialogConfiguration } from '@microsoft/sp-dialog';
import { Dialog, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { ResponsiveMode } from 'office-ui-fabric-react/lib/Dialog';
import { useBoolean } from '@fluentui/react-hooks/lib/useBoolean';
import { ICommandInfo } from '../IModel';
import { SHPTContainer } from './SHPTContainer';

const modelProps = {
    isBlocking: false,
};
const dialogContentProps = {
    type: DialogType.largeHeader,
    title: strings.DialogTitle,
    subText: '',
    showCloseButton: true
};
export interface IAppDialogProps {
    closeDialog: () => void;
    data: ICommandInfo;
}

export const AppDialog: React.FunctionComponent<IAppDialogProps> = (props) => {
    const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(false);

    const _closeDialog = () => {
        props.closeDialog();
        toggleHideDialog();
    };

    return (
        <>
            <div style={{minWidth: '900px', maxHeight: '500px', borderTop: '4px solid #0078d4', padding: '10px'}}>
                <h3 style={{color: '#0078d4', fontSize: '20px', margin: 0, minHeight: '20px', padding: '16px 46px 20px 24px'}}>{strings.DialogTitle}</h3>
                <SHPTContainer Info={props.data} closeDialog={_closeDialog} />
            </div>
            {/* <Dialog
                hidden={hideDialog}
                onDismiss={toggleHideDialog}
                dialogContentProps={dialogContentProps}
                modalProps={modelProps}
                closeButtonAriaLabel={strings.CloseAL} 
                minWidth="900px"
                maxHeight="500px"
                responsiveMode={ResponsiveMode.large}>
                    <SHPTContainer Info={props.data} closeDialog={_closeDialog} />
            </Dialog> */}
        </>
    );
};

export default class AppBaseDialog extends BaseDialog {
    public data: ICommandInfo;
    public closeDialog: () => void;

    public render(): void {
        const reactElement = <AppDialog closeDialog={this.closeDialog} data={this.data} />;
        ReactDOM.render(reactElement, this.domElement);
    }

    public getConfig(): IDialogConfiguration {
        return {
            isBlocking: true,
        };
    }
}
