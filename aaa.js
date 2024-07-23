// для вставки значения атрибута в ячейку. ODS формат
const bbb = {
  templateId: 1,
  tempalteFormat: "ods",
  insertType: "attribute_value",
  coordinates: {
    row: 1,
    coulumn: "A",
  },
  entityId: 123,
  entity: "model",
  attributeName: "name",
};

const aaa = {
  templateId: 1,
  insertType: "table",
  entity: "model",
  coordinates: {
    row: 1,
    coulumn: "A",
  },
  columns: [
    {
      header: "Название модели",
      entity: "model",
      attribute: "name",
    },
    {
      header: "Состояние модели",
      entity: "model",
      attribute: "state",
    },
    {
      header: "Название проекта",
      entity: "project",
      attribute: "state",
    },
  ],
  filters: [
    {
      entity: "model",
      attributes: {},
    },
    {
      entity: "model",
      attributes: {},
    },
    {
      entity: "model",
      attributes: {},
    },
  ],
};


const templateMarkup = {
    templateId: 1,
    templateFormat: "odt",
    insertionElements: [
      {
        type: "value",
        coordinates: {
          row: 1,
          column: "A",
        },
        entityId: 123,
        entity: "model",
        attributeName: "name",
      },
      {
        type: "table",
        coordinates: {
          row: 1,
          column: "A",
        },
        entity: "model",
        columns: [
          {
            header: "Название модели",
            entity: "model",
            attribute: "name",
          },
          {
            header: "Состояние модели",
            entity: "model",
            attribute: "state",
          },
          {
            header: "Название проекта",
            entity: "project",
            attribute: "state",
          },
        ],
        filters: [
          {
            entity: "user",
            attributes: {
                roleUi: 1,
                roleWeb: 2
            },
          },
          {
            entity: "signal",
            attributes: {
                state: 4,
            },
          },
        ],
      }
    ]
  };

const filter = "/filter?entity=model&";
