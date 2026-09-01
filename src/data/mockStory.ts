import type { StoryStructure } from '../types'

const img = (name: string) => `/img/${name}.svg`

export const mockStory: StoryStructure = {
  periods: [
    {
      id: 'detstvo',
      title: 'Детство',
      cards: [
        {
          id: 'detstvo-dom',
          title: 'Мой дом',
          year: 1994,
          memory: 'Деревянный дом, где пахло бабушкиными пирогами.',
          photo: img('house'),
        },
        {
          id: 'detstvo-mladenec',
          title: 'Я — младенец',
          year: 1990,
          memory: 'Мама говорит, я улыбался во сне.',
          photo: img('baby'),
        },
        {
          id: 'detstvo-sadik',
          title: 'Я в садике',
          memory: 'Воспитательница звала меня «почемучкой».',
          photo: img('kindergarten'),
        },
        {
          id: 'detstvo-pusto',
          title: 'Мои друзья',
        },
        {
          id: 'detstvo-pervyj-velosiped',
          title: 'Мой первый велосипед',
        },
      ],
    },
    {
      id: 'shkola',
      title: 'Школа',
      cards: [
        {
          id: 'shkola-pervyj-klass',
          title: 'Первый класс',
          year: 1997,
          memory: 'Букет гладиолусов больше меня самого.',
          photo: img('school'),
        },
        {
          id: 'shkola-mesto',
          title: 'Моё любимое место',
          photo: img('porch'),
        },
        {
          id: 'shkola-letnie-kanikuly',
          title: 'Летние каникулы',
        },
        {
          id: 'shkola-uchitel',
          title: 'Мой учитель',
        },
      ],
    },
    {
      id: 'yunost',
      title: 'Юность',
      cards: [
        {
          id: 'yunost-druzya',
          title: 'Мои друзья',
          year: 2005,
          memory: 'Костёр, гитара и разговоры до утра.',
          photo: img('friends'),
        },
        {
          id: 'yunost-more',
          title: 'Поездка к морю',
          year: 2006,
          photo: img('sea'),
        },
        {
          id: 'yunost-pesnya',
          title: 'Моя любимая песня',
          memory: 'Тот самый трек, под который всё казалось возможным.',
        },
      ],
    },
    {
      id: 'vzroslaya-zhizn',
      title: 'Начало взрослой жизни',
      cards: [
        {
          id: 'vzr-bal',
          title: 'Выпускной',
          year: 2009,
          memory: 'Мы думали, впереди вся жизнь. Так и было.',
          photo: img('graduation'),
        },
        {
          id: 'vzr-city',
          title: 'Мой первый город',
          memory: 'Огромный город, в котором я всему учился заново.',
          photo: img('city'),
        },
      ],
    },
    {
      id: 'segodnya',
      title: 'Сегодня',
      cards: [
        {
          id: 'seg-uspeh',
          title: 'Дело, которым я горжусь',
          year: 2023,
          memory: 'Тихий маленький старт, из которого выросло что-то большое.',
          photo: img('work'),
        },
        {
          id: 'seg-mesto',
          title: 'Моё любимое место',
          photo: img('cafe'),
        },
        {
          id: 'seg-pitomec',
          title: 'Мой питомец',
        },
        {
          id: 'seg-puteshestvie',
          title: 'Моё путешествие',
        },
      ],
    },
    {
      id: 'prodolzhenie',
      title: 'Продолжение следует…',
      cards: [],
    },
  ],
}
