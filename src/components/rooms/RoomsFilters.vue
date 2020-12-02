<template>
  <div class="filters-container" :class="{ expanded: expanded }">
    <div class="filters">
      <div v-for="filter in filters" :key="filter.category" class="filter">
        <v-checkbox
          :label="filter.category"
          :color="filter.color"
          :value="filter.category"
          v-model="checkedFilters"
          hide-details
        ></v-checkbox>
      </div>
    </div>
    <div @click="expanded = !expanded" class="filters-drawer">
      <h3>Filters</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expanded: false,
      checkedFilters: [],
      filters: [
        { category: "Sport", color: "orange" },
        { category: "Hangout", color: "info" },
        { category: "Protest", color: "red" },
        { category: "Study", color: "#CE93D8" },
      ],
    };
  },
  watch: {
    checkedFilters(filters) {
      this.$emit("filterChange", filters);
    },
  },
};
</script>
<style lang="scss" scoped>
.filters-container {
  display: flex;
  left: -116px;
  position: fixed;
  z-index: 99;
  transition: all 1s ease;

  &.expanded {
    left: 0;
    .filters-drawer {
      opacity: 1;
    }
  }

  .filters {
    border: 1px solid black;
    border-left: 0;
    border-radius: 4px;
    padding: 10px;
    background-color: white;
  }

  .filters-drawer {
    cursor: pointer;
    padding: 5px 10px;
    align-self: center;
    background-color: red;
    color: white;
    border: 1px solid black;
    border-radius: 8px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 0;
    opacity: 0.7;
    transition: all 0.5s ease;
  }
  .filters-drawer:hover {
    opacity: 1;
  }
}
</style>
