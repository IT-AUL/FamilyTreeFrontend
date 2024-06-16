import React, { Component } from 'react';
import FamilyTree from "@balkangraph/familytree.js";

export default class Tree extends Component {
    constructor(props) {
        super(props);
        this.divRef = React.createRef();
    }

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        this.family = new FamilyTree(this.divRef.current, {
            nodes: this.props.nodes,
            mouseScrool: FamilyTree.none,
            roots: [3],
            nodeMenu: {
                edit: { text: 'Изменить' },
                details: { text: 'Детали' },
            },
            nodeTreeMenu: true,
            nodeBinding: {
                field_0: 'name',
                field_1: 'born',
                img_0: 'photo'
            },
            editForm: {
                titleBinding: "name",
                photoBinding: "photo",
                addMoreBtn: 'Добавить',
                addMore: 'Добавить ещё',
                addMoreFieldName: 'Имя элемента',
                generateElementsFromFields: false,
                elements: [
                    { type: 'textbox', label: 'ФИО', binding: 'name' },
                    { type: 'textbox', label: 'Email', binding: 'email' },
                    { type: 'textbox', label: 'Телефон', binding: 'phone' },
                    [
                        { type: 'date', label: 'Дата рождения', binding: 'born' },
                        { type: 'date', label: 'Дата смерти', binding: 'death' }
                    ],
                    [
                        { type: 'textbox', label: 'Страна', binding: 'country' },
                        { type: 'textbox', label: 'Город', binding: 'city' },
                    ],
                    { type: 'textbox', label: 'Биография', binding: 'bio' },
                ]
            },
        });

        FamilyTree.SEARCH_PLACEHOLDER = "Поиск";

        this.family.on('field', function (sender, args) {
            if (args.name === 'born' || args.name === 'death') {
                var date = new Date(args.value);
                args.value = date.toLocaleDateString();
            }
        });


        document.addEventListener('click', (event) => {
            if (event.target.getAttribute('data-edit-form-save') !== null) {
                console.log('Save button clicked');
                this.saveNodes();
            }
        });
    }

    saveNodes = () => {
        if (!this.family.nodes || !Array.isArray(this.family.nodes)) {
            console.error('Nodes data is invalid:', this.family.nodes);
            return;
        }

        console.log('Saving nodes:', this.family.nodes);
        this.props.onSaveNodes(this.family.nodes);
    }

    render() {
        return (
            <div id="tree" ref={this.divRef}></div>
        );
    }
}
