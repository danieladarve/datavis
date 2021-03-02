<template>
  <div id="app">
    <section class="container mx-auto">
      <div class="m-4 bg-white border border-gray-300 border-solid rounded shadow">
        <header class="border-b flex border-solid border-gray-300 p-4 text-lg text-left font-medium">
          <span>Profiler Test Data</span>
          <div class="w-full md:w-1/3 ml-auto">
            <div class="relative">
              <select v-model="user" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                <option value="">Please select a test</option>
                <option v-for="(item, index) in users" :key="index" :value="item">{{ item }}</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </header>
        <section class=" flex flex-row flex-wrap items-center border-b border-solid border-gray-300 pb-4">
          <div class="w-full">
            <div class="p-12 bg-gray-100 border border-gray-300" @dragover="dragover" @dragleave="dragleave" @drop="drop">
              <input type="file" multiple name="fields[assetsFieldHandle][]" id="assetsFieldHandle"
                     class="w-px h-px opacity-0 overflow-hidden absolute" @change="onChange" ref="file" accept=".txt" />

              <label for="assetsFieldHandle" class="block cursor-pointer">
                <div>
                  Start by addding some tests, you can either drag and drop files here or <span class="underline">click here</span> to select files
                </div>
              </label>
              <ul class="mt-4" v-if="this.filelist.length" v-cloak>
                <li class="text-sm p-1" v-for="(file, index) in filelist" :key="index+'r'">
                  {{ file.name }}<button class="ml-2" type="button" @click="remove(filelist.indexOf(file))" title="Remove file">remove</button>
                </li>
              </ul>
            </div>
          </div>
          <div class="flex px-2 w-full pt-4">
            <div class="p-4 w-full sm:w-1/2 lg:w-1/4 border border-solid border-gray-300 mx-2">
              <span class="text-xs font-medium text-gray-500 uppercase">Name</span>
              <div class="py-2 flex items-center justify-start text-left"><span class="text-lg">{{ user.length?user:"Please select a test" }}</span></div>
            </div>
            <div class="p-4 w-full sm:w-1/2 lg:w-1/4 border border-solid border-gray-300 mx-2">
              <span class="text-xs font-medium text-gray-500 uppercase">Height</span>
              <div class="py-2 flex items-center justify-start text-left"><span class="text-lg">{{ user.length?testData[0].Height:"Please select a test" }}</span></div>
            </div>
            <div class="p-4 w-full sm:w-1/2 lg:w-1/4 border border-solid border-gray-300 mx-2">
              <span class="text-xs font-medium text-gray-500 uppercase">Weight</span>
              <div class="py-2 flex items-center justify-start text-left"><span class="text-lg">{{ user.length?testData[0].Weight:"Please select a test" }}</span></div>
            </div>
          </div>
          <div class="mt-4 w-full">
            <div v-dragscroll class="overflow-x-scroll flex grab-bing ">
              <div class="px-4">
                <span class="text-xs font-medium text-gray-500 uppercase">AIR</span>
                <div>
                  <table class="table-auto">
                    <thead>
                    <tr class="text-sm uppercase text-left">
                      <th class="border border-gray-300 px-4 py-2">Test #</th>
                      <th class="border border-gray-300 px-4 py-2">Reading #</th>
                      <th class="border border-gray-300 px-4 py-2">Enabled</th>
                      <th class="border border-gray-300 px-4 py-2">Flows</th>
                      <th class="border border-gray-300 px-4 py-2">Pressures</th>
                      <th class="border border-gray-300 px-4 py-2">Targets</th>
                    </tr>
                    </thead>
                    <tbody v-for="(item, index) in testData" :key="index+'r'">
                    <tr class="text-gray-500 text-sm" v-for="(reading, indexR) in item.Readings" :key="indexR+'reading'">
                      <td class="border border-gray-300 px-4 py-2 font-medium">{{ index + 1 }}</td>
                      <td class="border border-gray-300 px-4 py-2 font-medium">{{ indexR + 1 }}</td>
                      <td class="border border-gray-300 px-4 py-2 font-medium">{{ reading.air.enabled? "True":"False" }}</td>
                      <td class="border border-gray-300 px-4 py-2 font-medium">{{ reading.air.flows.toString() }}</td>
                      <td class="border border-gray-300 px-4 py-2 font-medium">{{ reading.air.pressures.toString() }}</td>
                      <td class="border border-gray-300 px-4 py-2 font-medium">{{ reading.air.targets.toString() }}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="px-4">
                <span class="text-xs font-medium text-gray-500 uppercase">BIOMETRICS</span>
                <div>
                  <table class="table-auto">
                    <thead>
                    <tr class="text-sm uppercase text-left">
                      <th class="border border-gray-300 px-4 py-2">Test #</th>
                      <th class="border border-gray-300 px-4 py-2">Reading #</th>
                      <th class="border border-gray-300 px-4 py-2">Height</th>
                      <th class="border border-gray-300 px-4 py-2">Weight</th>
                      <th class="border border-gray-300 px-4 py-2">Weight Mode</th>
                      <th class="border border-gray-300 px-4 py-2">Weight Points</th>
                    </tr>
                    </thead>
                    <tbody v-for="(item, index) in testData" :key="index+'r'">
                    <tr class="text-gray-500 text-sm" v-for="(reading, indexR) in item.Readings" :key="indexR+'reading'">
                      <td class="border border-gray-300 px-4 py-2 font-medium">{{ index + 1 }}</td>
                      <td class="border border-gray-300 px-4 py-2 font-medium">{{ indexR + 1 }}</td>
                      <td class="border border-gray-300 px-4 py-2 font-medium">{{ reading.biometrics.height }}</td>
                      <td class="border border-gray-300 px-4 py-2 font-medium">{{ reading.biometrics.weight }}</td>
                      <td class="border border-gray-300 px-4 py-2 font-medium">{{ reading.biometrics.weightmode }}</td>
                      <td class="border border-gray-300 px-4 py-2 font-medium whitespace-nowrap">{{ getWeightPoints(reading.biometrics.weighpoints) }}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="px-4">
                <span class="text-xs font-medium text-gray-500 uppercase">Configuration</span>
                <div>
                  <table class="table-auto  text-left">
                    <thead>
                    <tr class="text-sm uppercase text-left">
                      <th class="border border-gray-300 px-4 py-2">Test #</th>
                      <th class="border border-gray-300 px-4 py-2">Reading #</th>
                      <th class="border border-gray-300 px-4 py-2">Average</th>
                      <th class="border border-gray-300 px-4 py-2">Interval</th>
                      <th class="border border-gray-300 px-4 py-2">Overage</th>
                      <th class="border border-gray-300 px-4 py-2">Timeout</th>
                      <th class="border border-gray-300 px-4 py-2">Tolerance</th>
                      <th class="border border-gray-300 px-4 py-2">Underage</th>
                    </tr>
                    </thead>
                    <tbody v-for="(item, index) in testData" :key="index+'r'">
                    <tr class="text-gray-500 text-sm" v-for="(reading, indexR) in item.Readings" :key="indexR+'reading'">
                      <td class="border border-gray-300 px-4 py-2 font-medium">{{ index + 1 }}</td>
                      <td class="border border-gray-300 px-4 py-2 font-medium">{{ indexR + 1 }}</td>
                      <td class="border border-gray-300 px-4 py-2 font-medium">{{ reading.configuration.average }}</td>
                      <td class="border border-gray-300 px-4 py-2 font-medium">{{ reading.configuration.interval }}</td>
                      <td class="border border-gray-300 px-4 py-2 font-medium">{{ reading.configuration.overage }}</td>
                      <td class="border border-gray-300 px-4 py-2 font-medium">{{ reading.configuration.timeout }}</td>
                      <td class="border border-gray-300 px-4 py-2 font-medium">{{ reading.configuration.tolerance }}</td>
                      <td class="border border-gray-300 px-4 py-2 font-medium">{{ reading.configuration.underage }}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="px-4">
                <span class="text-xs font-medium text-gray-500 uppercase">Surface</span>
                <div>
                  <table class="table-auto ">
                    <thead>
                    <tr class="text-sm uppercase text-left">
                      <th class="border border-gray-300 px-4 py-2">Test #</th>
                      <th class="border border-gray-300 px-4 py-2">Reading #</th>
                      <th class="border border-gray-300 px-4 py-2">Columns</th>
                      <th class="border border-gray-300 px-4 py-2">Rows</th>
                      <th class="border border-gray-300 px-4 py-2">Pressures</th>
                    </tr>
                    </thead>
                    <tbody v-for="(item, index) in testData" :key="index+'r'">
                    <tr class="text-gray-500 text-sm" v-for="(reading, indexR) in item.Readings" :key="indexR+'reading'">
                      <td class="border border-gray-300 px-4 py-2 font-medium">{{ index + 1 }}</td>
                      <td class="border border-gray-300 px-4 py-2 font-medium">{{ indexR + 1 }}</td>
                      <td class="border border-gray-300 px-4 py-2 font-medium">{{ reading.surface.columns }}</td>
                      <td class="border border-gray-300 px-4 py-2 font-medium">{{ reading.surface.rows }}</td>
                      <td class="border border-gray-300 px-4 py-2 font-medium">
                        <span
                          @mouseover="handleMapping(reading.surface.pressures, index + 1, indexR + 1)">View Map</span></td>
                    </tr>
                    </tbody>
                  </table>

                </div>
              </div>
              <div class="px-4" v-show="map !== false">
                <span class="text-xs font-medium text-gray-500 uppercase">Pressure Map Test {{ test }} Reading {{ reading }}</span>
                <div class="bg-white border border-gray-300 w-34 table transform rotate-180">
                  <div v-for="(item, index) in map" :key="index+'map'"
                       :class="`bg-opacity-${item?`${item}0`:item}`"
                       class="bg-red-600 float-left h-2 w-2">
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
import './css/app.css';
import { dragscroll } from 'vue-dragscroll';

export default {
  name: 'App',
  components: {},
  data() {
    return {
      data: [],
      user: "",
      map: false,
      test: "",
      reading: "",
      filelist: [],
      processed: []
    };
  },
  directives: {
    'dragscroll': dragscroll
  },
  computed: {
    users: function() {
      return this.data.map(item => {
        return item.Name;
      }).filter(this.onlyUnique) ||  [];
    },
    testData: function() {
      if(this.user === ""){ return []; }
      return this.data.filter(item => item.Name === this.user);
    }
  },
  methods: {
    getTestContents(file) {
      let reader = new FileReader();

      const callback = (e) => {
        let test = {}
        const pfile = e.target.result;
        const allLines = pfile.split(/\r\n|\n/);
        let tests = [];
        allLines.forEach((line, index) => {
          if(index <= 3){
            let lineContent = line.split(" ");
            test[lineContent[0].slice(0, -1)] = lineContent[1]
          }else{
            if(line.length){
              tests.push(line);
            }
          }
        });
        const allTests = pfile.match(/(?:\{(?:(?:[^{}]+)|(?:[^{}]*\{[^{}]*\}[^{}]*)+)\})/gms)
        test["Readings"] = allTests.map(item => JSON.parse(item));
        this.data.push(test);
        this.processed.push(file.name);
      }
      reader.onload = callback;
      reader.readAsText(file);

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
    handleMapping(data, test, reading) {
      this.map = data;
      this.test = test;
      this.reading = reading;
    },
    onChange() {
      this.filelist = [...this.$refs.file.files];
      if(!this.filelist.length){ return []; }
      this.filelist.forEach((file) => {
        if(file.type === "text/plain" && !this.processed.indexOf(file.name) >= 0){
          this.getTestContents(file);
        }
      })
    },
    remove(i) {
      this.filelist.splice(i, 1);
    },
    dragover(event) {
      event.preventDefault();
      // Add some visual fluff to show the user can drop its files
      if (!event.currentTarget.classList.contains('bg-green-300')) {
        event.currentTarget.classList.remove('bg-gray-100');
        event.currentTarget.classList.add('bg-green-300');
      }
    },
    dragleave(event) {
      // Clean up
      event.currentTarget.classList.add('bg-gray-100');
      event.currentTarget.classList.remove('bg-green-300');
    },
    drop(event) {
      event.preventDefault();
      this.$refs.file.files = event.dataTransfer.files;
      this.onChange(); // Trigger the onChange event manually
      // Clean up
      event.currentTarget.classList.add('bg-gray-100');
      event.currentTarget.classList.remove('bg-green-300');
    }
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
</style>
