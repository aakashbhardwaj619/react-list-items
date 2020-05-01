import * as React from 'react';
import styles from './ListItemsClassic.module.scss';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export interface IListItemsViewerProps {
  lists: string | string[];
  context: WebPartContext;
}

export default class ListItemsViewer extends React.Component<IListItemsViewerProps, any> {
  constructor(props: IListItemsViewerProps) {
    super(props);

    this.state = {
      items: []
    };
  }

  public componentDidUpdate(prevProps: IListItemsViewerProps) {
    if (this.props.lists !== prevProps.lists) {
      this.getListItems(this.props.lists);
    }
  }

  private async getListItems(lists: string | string[]) {
    let listItems = [];

    try {
      const getListItemsResponse: SPHttpClientResponse = await this.props.context.spHttpClient.get(
        `${this.props.context.pageContext.web.absoluteUrl}/_api/lists/getbyid('${lists}')/items?$select=Title`,
        SPHttpClient.configurations.v1,
        {}
      );
      const getListItemsResponseJson = await getListItemsResponse.json();
      listItems = getListItemsResponseJson.value;
    } catch (error) {
      console.log(error);
    }

    this.setState({ items: listItems });
  }

  public render(): React.ReactElement<IListItemsViewerProps> {
    return (
      <div className={styles.listItemsClassic}>
        <ul>
          {this.state.items && this.state.items.map((item, index) => (
            <li key={index}>{item.Title}</li>
          ))}
        </ul>
      </div >
    );
  }
}
