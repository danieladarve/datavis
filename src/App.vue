<template xmlns="http://www.w3.org/1999/html">
  <div id="app">
    <section class="container mx-auto">
      <div class="m-4 bg-white border border-gray-300 border-solid rounded shadow">
        <header class="border-b flex border-solid border-gray-300 p-4 text-lg text-left font-medium">
          <span>Profiler Test Data</span>
          <div class="w-full md:w-1/3 ml-auto">
            <div class="relative">
              <select v-model="location" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                <option value="">Please select a location</option>
                <option v-for="(item, index) in locations" :key="index" :value="item">{{ item }}</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </header>
        <section class="border-b border-solid border-gray-300 pb-4">
          <div class="w-full px-4 text-center mt-6" v-if="testData !== false">
            <div class="border border-solid border-gray-300 ">
              <div v-dragscroll class="overflow-x-scroll flex grab-bing ">
                <div class="w-full mt-4 flex">
                  <div class="mx-2" v-for="(item, index) in biometrics.Left" :key="index+'biochart'">
                    <span class="text-sm font-medium text-gray-500 uppercase mx-auto table">{{ index }} Weight Chart @ {{ item.Weight }}kg</span>
                    <LineChartComponent :item-data-left="item" :item-data-right="biometrics.Right[index]"/>
                  </div>
                </div>
              </div>
              <div class="w-full mt-4 flex relative">
                <AllLineChartComponent class="w-full " :all-item-data="biometrics"/>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap overflow-hidden w-full px-2" v-if="testData !== false">
            <div
                v-for="(item, index) in biometrics.Left" :key="index+'bio'"
                class="w-full overflow-hidden mt-3 px-2 md:w-1/2 text-center"
            >
              <div class="border border-solid border-gray-300 ">

                <span class="text-sm font-medium text-gray-500 uppercase">{{ index }} Stats @ {{ item.Weight }}kg</span>
                <div class="py-2 flex items-center justify-center text-left">
                    <div class="text-center flex flex-col mx-2">
                      <span class="font-bold">MIN (L/R/OA)</span>
                      <span class="text-lg leading-none">{{ item.minWeight }}</span>
                      <span class="text-lg leading-none">{{ biometrics.Right[index].minWeight }}</span>
                      <span class="text-lg leading-none">{{ biometrics[index].overallMin }}</span>
                    </div>

                  <div class="text-center flex flex-col mx-2">
                    <span class="font-bold">MAX (L/R/OA)</span>
                    <span class="text-base leading-none">{{ item.maxWeight }}</span>
                    <span class="text-base leading-none">{{ biometrics.Right[index].maxWeight }}</span>
                    <span class="text-base leading-none">{{ biometrics[index].overallMax }}</span>
                  </div>


                  <div class="text-center flex flex-col mx-2">
                    <span class="font-bold">MEAN (L/R/OA)</span>
                    <span class="text-base leading-none">{{ item.meanWeight }}</span>
                    <span class="text-base leading-none">{{ biometrics.Right[index].meanWeight }}</span>
                    <span class="text-base leading-none">{{ biometrics[index].overallMean }}</span>
                  </div>

                  <div class="text-center flex flex-col mx-2">
                    <span class="font-bold">VARIANCE (L/R/OA)</span>
                    <span class="text-base leading-none">{{ item.variance }}</span>
                    <span class="text-base leading-none">{{ biometrics.Right[index].variance }}</span>
                    <span class="text-base leading-none">{{ biometrics[index].overallVariance }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-4 w-full" v-if="testData !== false">
            <div v-dragscroll class="overflow-x-scroll flex grab-bing ">
              <div class="px-4">
                <div>
                  <table class="table-auto">
                    <thead>
                    <tr class="text-sm uppercase text-left">
                      <th colspan="7" class="py-2"><span class="text-xs font-medium text-gray-500 uppercase">AIR</span></th>
                    </tr>
                    <tr class="text-sm uppercase text-left">
                      <th class="border border-gray-300 px-4 py-2">T#</th>
                      <th class="border border-gray-300 px-4 py-2">R#</th>
                      <th class="border border-gray-300 px-4 py-2">Name</th>
                      <th class="border border-gray-300 px-4 py-2">Enabled</th>
                      <th class="border border-gray-300 px-4 py-2">Flows</th>
                      <th class="border border-gray-300 px-4 py-2">Pressures</th>
                      <th class="border border-gray-300 px-4 py-2">Targets</th>
                    </tr>
                    </thead>
                    <tbody v-for="(item, index) in testData.Sides.Left" :key="index+'rair'">
                      <tr class="text-gray-500 text-sm" v-for="(reading, indexR) in item.Readings" :key="indexR+'readingair'">
                        <td class="border border-gray-300 px-4 py-2 font-medium">{{ index + 1 }}</td>
                        <td class="border border-gray-300 px-4 py-2 font-medium">{{ indexR + 1 }}</td>
                        <td class="border border-gray-300 px-4 py-2 font-medium whitespace-nowrap">{{ item.Name }} {{ testData.Sides.Right[index].Name }}</td>
                        <td class="border border-gray-300 font-medium">
                          <table>
                            <tr>
                              <td class="px-4 py-2 border-r border-gray-300">L</td>
                              <td class="px-4 py-2">{{ reading.air.enabled? "Y":"N" }}</td>
                              <td class="px-4 py-2 border-r border-l border-gray-300">R</td>
                              <td class="px-4 py-2">{{ testData.Sides.Right[index].Readings[indexR].air.enabled? "Y":"N" }}</td>
                            </tr>
                          </table>
                        </td>
                        <td class="border border-gray-300 font-medium">
                          <table>
                            <tr>
                              <td class="px-4 py-2 border-r border-gray-300">L</td>
                              <td class="px-4 py-2">{{ reading.air.flows.toString() }}</td>
                              <td class="px-4 py-2 border-r border-l border-gray-300">R</td>
                              <td class="px-4 py-2">{{ testData.Sides.Right[index].Readings[indexR].air.flows.toString() }}</td>
                            </tr>
                          </table>
                        </td>
                        <td class="border border-gray-300 font-medium">
                          <table>
                            <tr>
                              <td class="px-4 py-2 border-r border-gray-300">L</td>
                              <td class="px-4 py-2">{{ reading.air.pressures.toString() }}</td>
                              <td class="px-4 py-2 border-r border-l border-gray-300">R</td>
                              <td class="px-4 py-2">{{ testData.Sides.Right[index].Readings[indexR].air.pressures.toString() }}</td>
                            </tr>
                          </table>
                        </td>
                        <td class="border border-gray-300 font-medium">
                          <table>
                            <tr>
                              <td class="px-4 py-2 border-r border-gray-300">L</td>
                              <td class="px-4 ">{{ reading.air.targets.toString() }}</td>
                              <td class="px-4 py-2 border-r border-l border-gray-300">R</td>
                              <td class="px-4 py-2">{{ testData.Sides.Right[index].Readings[indexR].air.targets.toString() }}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="px-4">

                <div>
                  <table class="table-auto">
                    <thead>
                    <tr class="text-sm uppercase text-left">
                      <th colspan="7" class="py-2"><span class="text-xs font-medium text-gray-500 uppercase">BIOMETRICS</span></th>
                    </tr>
                    <tr class="text-sm uppercase text-left">
                      <th class="border border-gray-300 px-4 py-2">T#</th>
                      <th class="border border-gray-300 px-4 py-2">R#</th>
                      <th class="border border-gray-300 px-4 py-2">Name</th>
                      <th class="border border-gray-300 px-4 py-2">Height</th>
                      <th class="border border-gray-300 px-4 py-2">Weight</th>
                      <th class="border border-gray-300 px-4 py-2">Weight Mode</th>
                      <th class="border border-gray-300 px-4 py-2">Weight Points</th>
                    </tr>
                    </thead>
                    <tbody v-for="(item, index) in testData.Sides.Left" :key="index+'r'">
                      <tr class="text-gray-500 text-sm" v-for="(reading, indexR) in item.Readings" :key="indexR+'reading'">
                        <td class="border border-gray-300 px-4 py-2 font-medium">{{ index + 1 }}</td>
                        <td class="border border-gray-300 px-4 py-2 font-medium">{{ indexR + 1 }}</td>
                        <td class="border border-gray-300 px-4 py-2 font-medium">{{ item.Name }} {{ testData.Sides.Right[index].Name }}</td>
                        <td class="border border-gray-300 font-medium">
                          <table>
                            <tr>
                              <td class="px-4 py-2 border-r border-gray-300">L</td>
                              <td class="px-4 py-2">{{ reading.biometrics.height }}</td>
                              <td class="px-4 py-2 border-r border-l border-gray-300">R</td>
                              <td class="px-4 py-2">{{ testData.Sides.Right[index].Readings[indexR].biometrics.height }}</td>
                            </tr>
                          </table>
                        </td>
                        <td class="border border-gray-300 font-medium">
                          <table>
                            <tr>
                              <td class="px-4 py-2 border-r border-gray-300">L</td>
                              <td class="px-4 py-2">{{ reading.biometrics.weight }}</td>
                              <td class="px-4 py-2 border-r border-l border-gray-300">R</td>
                              <td class="px-4 py-2">{{ testData.Sides.Right[index].Readings[indexR].biometrics.weight }}</td>
                            </tr>
                          </table>
                        </td>
                        <td class="border border-gray-300 font-medium">
                          <table>
                            <tr>
                              <td class="px-4 py-2 border-r border-gray-300">L</td>
                              <td class="px-4 py-2">{{ reading.biometrics.weightmode }}</td>
                              <td class="px-4 py-2 border-r border-l border-gray-300">R</td>
                              <td class="px-4 py-2">{{ testData.Sides.Right[index].Readings[indexR].biometrics.weightmode }}</td>
                            </tr>
                          </table>
                        </td>
                        <td class="border border-gray-300 font-medium">
                          <table>
                            <tr>
                              <td class="px-4 py-2 border-r border-gray-300">L</td>
                              <td class="px-4 ">{{ getWeightPoints(reading.biometrics.weighpoints) }}</td>
                              <td class="px-4 py-2 border-r border-l border-gray-300">R</td>
                              <td class="px-4 py-2">{{ getWeightPoints(testData.Sides.Right[index].Readings[indexR].biometrics.weighpoints) }}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="px-4">
                <div>
                  <table class="table-auto">
                    <thead>
                    <tr class="text-sm uppercase text-left">
                      <th colspan="9" class="py-2"><span class="text-xs font-medium text-gray-500 uppercase">CONFIGURATION</span></th>
                    </tr>
                    <tr class="text-sm uppercase text-left">
                      <th class="border border-gray-300 px-4 py-2">T#</th>
                      <th class="border border-gray-300 px-4 py-2">R#</th>
                      <th class="border border-gray-300 px-4 py-2">Name</th>
                      <th class="border border-gray-300 px-4 py-2">Average</th>
                      <th class="border border-gray-300 px-4 py-2">Interval</th>
                      <th class="border border-gray-300 px-4 py-2">Overage</th>
                      <th class="border border-gray-300 px-4 py-2">Timeout</th>
                      <th class="border border-gray-300 px-4 py-2">Tolerance</th>
                      <th class="border border-gray-300 px-4 py-2">Underage</th>
                    </tr>
                    </thead>
                    <tbody v-for="(item, index) in testData.Sides.Left" :key="index+'rconfig'">
                    <tr class="text-gray-500 text-sm" v-for="(reading, indexR) in item.Readings" :key="indexR+'readingconfig'">
                      <td class="border border-gray-300 px-4 py-2 font-medium">{{ index + 1 }}</td>
                      <td class="border border-gray-300 px-4 py-2 font-medium">{{ indexR + 1 }}</td>
                      <td class="border border-gray-300 px-4 py-2 font-medium whitespace-nowrap">{{ item.Name }} {{ testData.Sides.Right[index].Name }}</td>
                      <td class="border border-gray-300 font-medium">
                        <table>
                          <tr>
                            <td class="px-4 py-2 border-r border-gray-300">L</td>
                            <td class="px-4 py-2">{{ reading.configuration.average }}</td>
                            <td class="px-4 py-2 border-r border-l border-gray-300">R</td>
                            <td class="px-4 py-2">{{ testData.Sides.Right[index].Readings[indexR].configuration.average }}</td>
                          </tr>
                        </table>
                      </td>
                      <td class="border border-gray-300 font-medium">
                        <table>
                          <tr>
                            <td class="px-4 py-2 border-r border-gray-300">L</td>
                            <td class="px-4 py-2">{{ reading.configuration.interval }}</td>
                            <td class="px-4 py-2 border-r border-l border-gray-300">R</td>
                            <td class="px-4 py-2">{{ testData.Sides.Right[index].Readings[indexR].configuration.interval }}</td>
                          </tr>
                        </table>
                      </td>
                      <td class="border border-gray-300 font-medium">
                        <table>
                          <tr>
                            <td class="px-4 py-2 border-r border-gray-300">L</td>
                            <td class="px-4 py-2">{{ reading.configuration.overage }}</td>
                            <td class="px-4 py-2 border-r border-l border-gray-300">R</td>
                            <td class="px-4 py-2">{{ testData.Sides.Right[index].Readings[indexR].configuration.overage }}</td>
                          </tr>
                        </table>
                      </td>
                      <td class="border border-gray-300 font-medium">
                        <table>
                          <tr>
                            <td class="px-4 py-2 border-r border-gray-300">L</td>
                            <td class="px-4 py-2">{{ reading.configuration.timeout }}</td>
                            <td class="px-4 py-2 border-r border-l border-gray-300">R</td>
                            <td class="px-4 py-2">{{ testData.Sides.Right[index].Readings[indexR].configuration.timeout }}</td>
                          </tr>
                        </table>
                      </td>
                      <td class="border border-gray-300 font-medium">
                        <table>
                          <tr>
                            <td class="px-4 py-2 border-r border-gray-300">L</td>
                            <td class="px-4 py-2">{{ reading.configuration.tolerance }}</td>
                            <td class="px-4 py-2 border-r border-l border-gray-300">R</td>
                            <td class="px-4 py-2">{{ testData.Sides.Right[index].Readings[indexR].configuration.tolerance }}</td>
                          </tr>
                        </table>
                      </td>
                      <td class="border border-gray-300 font-medium">
                        <table>
                          <tr>
                            <td class="px-4 py-2 border-r border-gray-300">L</td>
                            <td class="px-4 py-2">{{ reading.configuration.underage }}</td>
                            <td class="px-4 py-2 border-r border-l border-gray-300">R</td>
                            <td class="px-4 py-2">{{ testData.Sides.Right[index].Readings[indexR].configuration.underage }}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="px-4">
                <div>
                  <table class="table-auto">
                    <thead>
                      <tr class="text-sm uppercase text-left">
                        <th colspan="6" class="py-2"><span class="text-xs font-medium text-gray-500 uppercase">SURFACE</span></th>
                      </tr>
                      <tr class="text-sm uppercase text-left">
                        <th class="border border-gray-300 px-4 py-2">T#</th>
                        <th class="border border-gray-300 px-4 py-2">R#</th>
                        <th class="border border-gray-300 px-4 py-2">Name</th>
                        <th class="border border-gray-300 px-4 py-2">Columns</th>
                        <th class="border border-gray-300 px-4 py-2">Rows</th>
                        <th class="border border-gray-300 px-4 py-2">Pressures</th>
                      </tr>
                    </thead>
                    <tbody v-for="(item, index) in testData.Sides.Left" :key="index+'rsurface'">
                    <tr class="text-gray-500 text-sm" v-for="(reading, indexR) in item.Readings" :key="indexR+'readingsurface'">
                      <td class="border border-gray-300 px-4 py-2 font-medium">{{ index + 1 }}</td>
                      <td class="border border-gray-300 px-4 py-2 font-medium">{{ indexR + 1 }}</td>
                      <td class="border border-gray-300 px-4 py-2 font-medium">{{ item.Name }} {{ testData.Sides.Right[index].Name }}</td>
                      <td class="border border-gray-300 font-medium">
                        <table>
                          <tr>
                            <td class="px-4 py-2 border-r border-gray-300">L</td>
                            <td class="px-4 py-2">{{ reading.surface.columns }}</td>
                            <td class="px-4 py-2 border-r border-l border-gray-300">R</td>
                            <td class="px-4 py-2">{{ testData.Sides.Right[index].Readings[indexR].surface.columns }}</td>
                          </tr>
                        </table>
                      </td>
                      <td class="border border-gray-300 font-medium">
                        <table>
                          <tr>
                            <td class="px-4 py-2 border-r border-gray-300">L</td>
                            <td class="px-4 py-2">{{ reading.surface.rows }}</td>
                            <td class="px-4 py-2 border-r border-l border-gray-300">R</td>
                            <td class="px-4 py-2">{{ testData.Sides.Right[index].Readings[indexR].surface.rows }}</td>
                          </tr>
                        </table>
                      </td>
                      <td class="border border-gray-300 font-medium">
                        <table>
                          <tr>
                            <td class="px-4 py-2 border-r border-gray-300">L</td>
                            <td class="px-4 py-2"><span @mouseover="handleMapping(reading.surface.pressures, index + 1, indexR + 1, 'L')">View Map</span></td>
                            <td class="px-4 py-2 border-r border-l border-gray-300">R</td>
                            <td class="px-4 py-2"><span @mouseover="handleMapping(testData.Sides.Right[index].Readings[indexR].surface.pressures, index + 1, indexR + 1, 'R')">View Map</span></td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div ref="parentContainer" class="px-4">
                <div class="mt-2 relative">
                  <span class="text-xs font-medium text-gray-500 uppercase whitespace-no-wrap block w-full">Pressure Maps</span>
                  <div ref="mapsContainer" class="flex mt-3 absolute transition duration-500 ease-in-out left-0">
                    <div class="mx-2" v-if="maps.L.map !== false">
                      <span class="text-xs font-medium text-gray-500 uppercase block">LEFT SIDE</span>
                      <span class="text-xs font-medium text-gray-500 uppercase">Test {{ maps.L.test }} Reading {{ maps.L.reading }}</span>
                      <div class="bg-white border border-gray-300 w-34 table transform rotate-180">
                        <div v-for="(item, index) in maps.L.map" :key="index+'mapL'"
                             :class="`bg-opacity-${item?`${item}0`:item}`"
                             class="bg-red-600 float-left h-2 w-2">
                        </div>
                      </div>
                    </div>
                    <div class="mx-2 mr-6" v-if="maps.R.map !== false">
                      <span class="text-xs font-medium text-gray-500 uppercase block">RIGHT SIDE</span>
                      <span class="text-xs font-medium text-gray-500 uppercase">Test {{ maps.R.test }} Reading {{ maps.R.reading }}</span>
                      <div class="bg-white border border-gray-300 w-34 table transform rotate-180">
                        <div v-for="(item, index) in maps.R.map" :key="index+'mapR'"
                             :class="`bg-opacity-${item?`${item}0`:item}`"
                             class="bg-red-600 float-left h-2 w-2">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import LineChartComponent from "./components/LineChartComponent"
import AllLineChartComponent from "./components/AllLineChartComponent"
import './css/app.css';
import data from "./assets/data.json";
import { groupBy, min, max, mean, union, flattenDeep, mapValues, forIn } from "lodash";
import { dragscroll } from 'vue-dragscroll';

export default {
  name: 'App',
  components: {
    LineChartComponent,
    AllLineChartComponent
  },
  data() {
    return {
      data: [],
      user: "",
      location: "",
      map: false,
      maps: {
        R: {
          test: "",
          reading: "",
          side: "",
          map: false
        },
        L: {
          test: "",
          reading: "",
          side: "",
          map: false
        },
      },
    };
  },
  directives: {
    'dragscroll': dragscroll
  },
  computed: {
    locations: function() {
      return this.data.map(item => {
        return item.Location;
      }).filter(this.onlyUnique) ||  [];
    },
    testData: function() {
      if(this.location === ""){ return false; }
      const userData = this.data.filter(item => item.Location === this.location);
      return {
        Name: userData[0].Name,
        Height: userData[0].Height,
        Weight: userData[0].Weight,
        Readings: userData.map(item => item.Readings),
        data: flattenDeep(userData.map(item => item.Readings)),
        Sides: groupBy(userData, 'Side')
      };
    },
    biometrics: function() {
      let results = {
        meanWeight: "",
        maxWeight: "",
        minWeight: "",
      };
      if(!this.testData){
        return results
      }

      let left = groupBy(this.testData.Sides.Left, 'Name')
      left = this.getWeightVars(left)
      results.Left = left
      let right = groupBy(this.testData.Sides.Right, 'Name')
      right = this.getWeightVars(right)
      results.Right = right

      // Calculate Overalls
      forIn(left, (value, key) => {
        let overalls = union(value.AllWeights, right[key].AllWeights);
        results[key] = {
          overallMin: min(overalls),
          overallMax: max(overalls),
          overallVariance: max(overalls) - min(overalls),
          overallMean: mean(overalls).toFixed(2),
        }
      })

      return results;
    }
  },
  methods: {
    getWeightVars(weights) {
      return mapValues(weights, (o) => {
        const readings = o.map(item => item.Readings);
        const allReadings = flattenDeep(readings);
        const allWeights = allReadings.map(weight => {
          if(weight.biometrics.weightmode === "air") {
            return weight.biometrics.weight;
          }
        })
        return {
          Name: o[0].Name,
          Height: o[0].Height,
          Weight: o[0].Weight,
          Side: o[0].Side,
          Readings: readings,
          AllReadings: allReadings,
          AllWeights: allWeights,
          minWeight: min(allWeights),
          maxWeight: max(allWeights),
          variance: max(allWeights) - min(allWeights),
          meanWeight: mean(allWeights).toFixed(2),
        }
      })
    },
    onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    },
    getWeightPoints(wp) {
      const allItems = wp.map(item => {
        return `(${item.toString()})`
      });
      return allItems.toString();
    },
    handleMapping(data, test, reading, side) {
      this.maps[side] = {
        test: test,
        reading: reading,
        side: side,
        map: data
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.data = data;
    });
  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

td {
  @apply whitespace-nowrap;
}
</style>
