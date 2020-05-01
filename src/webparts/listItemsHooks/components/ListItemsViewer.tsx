import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { ListItemsWebPartContext } from './ListItemsHooks';
import styles from './ListItemsHooks.module.scss';

export interface IListItemsViewerProps {
  lists: string | string[];
}

export const ListItemsViewer: React.FunctionComponent<IListItemsViewerProps> = (props) => {
  const [items, setItems] = useState([]);

  const context = useContext(ListItemsWebPartContext);

  useEffect(() => {
    if (props.lists) {
      getListItems(props.lists);
    }
  }, [props.lists]);

  async function getListItems(lists: string | string[]) {
    let listItems = [];

    try {
      const getListItemsResponse: SPHttpClientResponse = await context.spHttpClient.get(
        `${context.pageContext.web.absoluteUrl}/_api/lists/getbyid('${lists}')/items?$select=Title`,
        SPHttpClient.configurations.v1,
        {}
      );
      const getListItemsResponseJson = await getListItemsResponse.json();
      listItems = getListItemsResponseJson.value;
    } catch (error) {
      console.log(error);
    }

    setItems(listItems);
  }

  return (
    <div className={styles.listItemsHooks}>
      <ul>
        {items && items.map((item, index) => (
          <li key={index}>{item.Title}</li>
        ))}
      </ul>
    </div >
  );
};