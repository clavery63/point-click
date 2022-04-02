import { useSelector } from 'admin/ui/hooks/redux';
import { Entity } from 'admin/ui/preview/Viewport';
import React from 'react';
import { Group } from 'react-konva';

const StaticEntities = () => {
  const ids = useSelector(state => {
    const allEntities = Object.values(state.gameState.worldState.entities);
    return allEntities
      .filter(ent => !!ent.isStatic)
      .map(ent => ent.id);
  });

  return (
    <Group>
      {ids.map(id => (
        <Entity
          key={id}
          id={id}
        />
      ))}
    </Group>
  );
};

export default StaticEntities;
