import React from 'react';
import styled from 'styled-components';

const Td = styled.td`
  text-align: center;
`

const StatsRow = props => {
  return (
    <tr>
      <Td>{props.userName}</Td>
      <Td>{props.messageCount}</Td>
    </tr>
  )
}

export default StatsRow;