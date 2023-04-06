import './style.css'
import typescriptLogo from './typescript.svg'
import { setupCounter } from './counter'

import produce from "immer";

const initialTravelPlan = {
    id: 0,
    title: '(Root)',
    childPlaces: [{
        id: 1,
        title: 'Earth',
        childPlaces: [{
            id: 2,
            title: 'Africa',
            childPlaces: [{
                id: 3,
                title: 'Botswana',
                childPlaces: []
            }, {
                id: 4,
                title: 'Egypt',
                childPlaces: []
            }, {
                id: 5,
                title: 'Kenya',
                childPlaces: []
            }, {
                id: 6,
                title: 'Madagascar',
                childPlaces: []
            }, {
                id: 7,
                title: 'Morocco',
                childPlaces: []
            }, {
                id: 8,
                title: 'Nigeria',
                childPlaces: []
            }, {
                id: 9,
                title: 'South Africa',
                childPlaces: []
            }]
        }, {
            id: 10,
            title: 'Americas',
            childPlaces: [{
                id: 11,
                title: 'Argentina',
                childPlaces: []
            }, {
                id: 12,
                title: 'Brazil',
                childPlaces: []
            }, {
                id: 13,
                title: 'Barbados',
                childPlaces: []
            }, {
                id: 14,
                title: 'Canada',
                childPlaces: []
            }, {
                id: 15,
                title: 'Jamaica',
                childPlaces: []
            }, {
                id: 16,
                title: 'Mexico',
                childPlaces: []
            }, {
                id: 17,
                title: 'Trinidad and Tobago',
                childPlaces: []
            }, {
                id: 18,
                title: 'Venezuela',
                childPlaces: []
            }]
        }, {
            id: 19,
            title: 'Asia',
            childPlaces: [{
                id: 20,
                title: 'China',
                childPlaces: []
            }, {
                id: 21,
                title: 'Hong Kong',
                childPlaces: []
            }, {
                id: 22,
                title: 'India',
                childPlaces: []
            }, {
                id: 23,
                title: 'Singapore',
                childPlaces: []
            }, {
                id: 24,
                title: 'South Korea',
                childPlaces: []
            }, {
                id: 25,
                title: 'Thailand',
                childPlaces: []
            }, {
                id: 26,
                title: 'Vietnam',
                childPlaces: []
            }]
        }, {
            id: 27,
            title: 'Europe',
            childPlaces: [{
                id: 28,
                title: 'Croatia',
                childPlaces: [],
            }, {
                id: 29,
                title: 'France',
                childPlaces: [],
            }, {
                id: 30,
                title: 'Germany',
                childPlaces: [],
            }, {
                id: 31,
                title: 'Italy',
                childPlaces: [],
            }, {
                id: 32,
                title: 'Portugal',
                childPlaces: [],
            }, {
                id: 33,
                title: 'Spain',
                childPlaces: [],
            }, {
                id: 34,
                title: 'Turkey',
                childPlaces: [],
            }]
        }, {
            id: 35,
            title: 'Oceania',
            childPlaces: [{
                id: 36,
                title: 'Australia',
                childPlaces: [],
            }, {
                id: 37,
                title: 'Bora Bora (French Polynesia)',
                childPlaces: [],
            }, {
                id: 38,
                title: 'Easter Island (Chile)',
                childPlaces: [],
            }, {
                id: 39,
                title: 'Fiji',
                childPlaces: [],
            }, {
                id: 40,
                title: 'Hawaii (the USA)',
                childPlaces: [],
            }, {
                id: 41,
                title: 'New Zealand',
                childPlaces: [],
            }, {
                id: 42,
                title: 'Vanuatu',
                childPlaces: [],
            }]
        }]
    }, {
        id: 43,
        title: 'Moon',
        childPlaces: [{
            id: 44,
            title: 'Rheita',
            childPlaces: []
        }, {
            id: 45,
            title: 'Piccolomini',
            childPlaces: []
        }, {
            id: 46,
            title: 'Tycho',
            childPlaces: []
        }]
    }, {
        id: 47,
        title: 'Mars',
        childPlaces: [{
            id: 48,
            title: 'Corn Town',
            childPlaces: []
        }, {
            id: 49,
            title: 'Green Hill',
            childPlaces: [{
                id: 50,
                title: 'TTT',
                childPlaces: [{
                    id: 51,
                    title: 'MMM',
                    childPlaces: []
                }]
            }]
        }]
    }]
};

const nextStateClear = produce(initialTravelPlan.childPlaces, draft => {
    const deleteItem = (planets, id) => {
        if(planets.some((planet) => planet.id === id)) {
            return planets.filter((planet) => planet.id !== id)
        }
        else {
            planets.forEach((item) => {
                item.childPlaces = deleteItem(item.childPlaces, id)
            })
        }

        return planets;
    }

    deleteItem(draft, 49)
})

const nextStateDirty = produce(initialTravelPlan.childPlaces, draft => {
    const deleteItem = (plan, id) => {
        return plan.filter(node => {
            if (node.id === id) {
                // Exclude the node if its ID matches the specified ID
                return false;
            }
            // Recursively exclude the node from its childPlaces array
            node.childPlaces = deleteItem(node.childPlaces, id);
            return true;

        });
    }

    deleteItem(draft, 49)
})

console.log(nextStateClear[1] === initialTravelPlan.childPlaces[1], "clear");
console.log(nextStateDirty[1] === initialTravelPlan.childPlaces[1], 'dirty');
console.log(JSON.stringify(nextStateClear) === JSON.stringify(nextStateDirty), 'equal')
console.log(JSON.stringify(nextStateClear))
console.log(JSON.stringify(nextStateDirty))

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
