import React, { useState } from 'react';
import style from './ClickAnimation.module.css';
import { Wrapper } from '../../components';
import { Divider, Typography } from 'antd'; // Подключаем стили

interface Spark {
  id: string;
  left: number;
  top: number;
  dx: number;
  dy: number;
}

interface CustomCSSProperties extends React.CSSProperties {
  '--dx'?: string; // Определяем переменную
  '--dy'?: string; // Определяем переменную
}

export const ClickAnimation: React.FC = () => {
  const [sparks, setSparks] = useState<Spark[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const sparkCount = 12; // Количество частиц
    const newSparks: Spark[] = [];

    for (let i = 0; i < sparkCount; i++) {
      const angle = (i * 360) / sparkCount; // Расчет угла для равномерного распределения
      const dx = 50 * Math.cos((angle * Math.PI) / 180); // Смещение по X
      const dy = 50 * Math.sin((angle * Math.PI) / 180); // Смещение по Y
      console.log(e.pageY, e.pageX);
      newSparks.push({
        id: `${Date.now()}-${i}`, // Уникальный идентификатор
        left: e.pageX - 200, // Положение курсора
        top: e.pageY - 50, // Положение курсора
        dx,
        dy,
      });
    }

    setSparks((prev) => [...prev, ...newSparks]);

    // Удаление частиц после завершения анимации
    setTimeout(() => {
      setSparks((prev) => prev.filter((spark) => !newSparks.includes(spark)));
    }, 1000); // Время совпадает с длительностью анимации
  };

  return (
    <Wrapper>
      <Typography>Click</Typography>
      <Divider />
      <div
        onClick={handleClick}
        style={{
          height: '50vh',
          width: 'auto',
          border: '1px dashed black',
        }}
      >
        {sparks.map((spark) => (
          <div
            key={spark.id}
            className={style.spark}
            style={
              {
                left: `${spark.left - 430}px`,
                top: `${spark.top - 105}px`,
                '--dx': `${spark.dx}px`,
                '--dy': `${spark.dy}px`,
              } as CustomCSSProperties
            }
          />
        ))}
      </div>
    </Wrapper>
  );
};
