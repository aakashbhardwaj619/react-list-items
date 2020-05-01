import * as React from 'react';
import styles from './ListItemsClassic.module.scss';
import { IListItemsClassicProps } from './IListItemsClassicProps';
import { ListPicker } from '@pnp/spfx-controls-react/lib/ListPicker';
import ListItemsViewer from './ListItemsViewer';

export default class ListItemsClassic extends React.Component<IListItemsClassicProps, any> {
  constructor(props: IListItemsClassicProps) {
    super(props);

    this.state = {
      lists: ''
    };
  }

  private onListPickerChange = (lists: string | string[]) => {
    this.setState({ lists });
  }

  public render(): React.ReactElement<IListItemsClassicProps> {
    return (
      <div className={styles.listItemsClassic}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>React List Items!</span>
              <br /><br />
              <ListPicker context={this.props.context}
                placeHolder='Select your list(s)'
                baseTemplate={100}
                includeHidden={false}
                multiSelect={false}
                onSelectionChanged={this.onListPickerChange} />
              <br />
              <ListItemsViewer lists={this.state.lists} context={this.props.context} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
