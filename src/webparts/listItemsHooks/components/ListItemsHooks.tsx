import * as React from 'react';
import { useState } from 'react';
import styles from './ListItemsHooks.module.scss';
import { IListItemsHooksProps } from './IListItemsHooksProps';
import { ListPicker } from '@pnp/spfx-controls-react/lib/ListPicker';
import { ListItemsViewer } from './ListItemsViewer';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export const ListItemsWebPartContext = React.createContext<WebPartContext>(null);

export const ListItemsHooks: React.FunctionComponent<IListItemsHooksProps> = (props) => {
  const [lists, setLists] = useState<string | string[]>('');

  return (
    <ListItemsWebPartContext.Provider value={props.context}>
      <div className={styles.listItemsHooks}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>React List Items!</span>
              <br /><br />
              <ListPicker context={props.context}
                placeHolder='Select your list(s)'
                baseTemplate={100}
                includeHidden={false}
                multiSelect={false}
                onSelectionChanged={val => setLists(val)} />
              <br />
              <ListItemsViewer lists={lists} />
            </div>
          </div>
        </div>
      </div>
    </ListItemsWebPartContext.Provider>
  );
};