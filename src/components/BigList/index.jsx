import React, { useState, useEffect, useRef } from "react";
import faker from "faker";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";

const BigList = () => {
  const cache = useRef(new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100
  }));
  const [people, setPeople] = useState([]);
  
  useEffect(() => {
    setPeople([...Array(10000).keys()].map(key => {
      return {
        id: key,
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        bio: faker.lorem.lines(Math.random() * 100),
      }
    }))
  }, [])


  return (
    <div className="big-list">
      {/* {people.map((person) => (
        <div key={person.id}>
          <h2>{person.name}</h2>
          <p>{person.bio}</p>
        </div>
      ))} */}

      <div style={{width: "100%", height: "100vh"}}>
        <AutoSizer>
          {({width, height}) => (
            <List 
              width={width}
              height={height}
              rowHeight={cache.current.rowHeight}
              deferredMeasurementCache={cache.current}
              rowCount={people.length}
              rowRenderer={({key, index, style, parent}) => {
                const person = people[index];
      
                return (
                  <CellMeasurer 
                    key={key} 
                    cache={cache.current} 
                    parent={parent} 
                    columnIndex={0} 
                    rowIndex={index}
                  > 
                    <div style={style}> 
                      <h2>{person.name}</h2>
                      <p>{person.bio}</p>
                    </div>
                  </CellMeasurer>
                )
              }}
            />
          )}
        </AutoSizer>
      </div>
    </div>
  )
}

export default BigList;