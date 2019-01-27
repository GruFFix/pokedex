import React from 'react';
import { get } from 'lodash';

import { Image, Badge } from 'react-bootstrap';

const IMG_SIZE = 55;

const ListItem = ({ id, name, images, types, weight }) => {
  const img = get(images, 'front_default', '');

  return (
    <tr>
      <td width={IMG_SIZE}>
        {id}
      </td>
      <td width={IMG_SIZE}>
        <Image width={IMG_SIZE} src={img} />
      </td>
      <td>
        {name}
      </td>
      <td>
        {weight}
      </td>
      <td>
        {types.slice().map((item, index) =>
          <Badge pill variant="info" key={index}>
            {item.type.name}
          </Badge>,
        )}
      </td>
    </tr>
  );
};

export default ListItem;
