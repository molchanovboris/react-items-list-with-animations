import { useState } from 'react'
import './App.scss'
import { Card, Button, Space, Input, List } from "antd";

function App() {
  const [newListItem, setNewListItem] = useState<string>("");
  const [list, setList] = useState<string[]>([]);
  const [deleted, setDeleted] = useState(false);

  const addNewItem = () => {
    if (newListItem && newListItem.trim()) {
      setList([...list, newListItem.trim()]);
    }
    setNewListItem("");
  };

  const deleteItem = (text: string, key: any) => {
    document.getElementById(`${key}`)?.classList.add('removed-item-animation')
    setTimeout(() => {
      const newList = list.filter((listItem) => (
        listItem !== text
      ));
      setList(newList);
    }, 1000)
  };


  const onChangeHandler = (e: any) => {
    const currentText: string = e.target.value;
    setNewListItem(currentText);
  };



  return (
    <Card title="List Items" style={{ width: 500 }}>
      <Space.Compact>
        <Input
          type="text"
          onChange={onChangeHandler}
          placeholder="Add new Item"
          value={newListItem}
          className="newItemInput"
        />
        <Button
          type="primary"
          id="add-to-list"
          onClick={addNewItem}
          className="removeItem"
        >
          Add
        </Button>
      </Space.Compact>

      <div className="listItemsContainer">
        {list.length > 0 ? (
          <List dataSource={list} className="listItems"
            renderItem={(item, i) => (
              <List.Item
                key={i}
                id={String(i)}
                className="listItem"
              >
                <List.Item.Meta title={item} className="listItemText" />
                <Button
                  className={`deleteItem`}

                  data-delete="zoom"
                  type="primary"
                  danger
                  onClick={() => deleteItem(item, i)}
                >
                  Delete
                </Button>
              </List.Item>
            )}
          />
        ) : (
          <div className="listMessage">No Items</div>
        )}
      </div>
    </Card>
  );
}

export default App
