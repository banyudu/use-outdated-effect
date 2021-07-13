# use-outdated-effect

useEffect with the `outdated` and `unmounted` functions as parameters

With `useOutdatedEffect`, you can check whether the dependency variables changed after async operations, then cancel the proceeding operations as you wish.

## install

```bash
    npm install --save use-outdated-effect
```

## usage

```jsx
import React, { FC, useState } from 'react'
import useOutdatedEffect from 'use-outdated-effect'
import axios from 'axios'

const App = (props) => {
  const { id } = props

  const [dataSource, setDataSource] = useState(null)

  useOutdatedEffect((outdated, unmounted) => {

    const fetchData = async () => {
      const { data } = await axios.get(`/api/mydata/${id}`)

      if (outdated()) { // check whether dependencies changed. In this example, it's the id variable
        // id changed, stop the current operations
        return
      }

      if (unmounted()) { // check whether component is unmounted
        // component destroied, stop the current operations
        return
      }

      setDataSource(data)
    }

  }, [id])

}

```
