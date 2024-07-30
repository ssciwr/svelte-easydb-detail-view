import ChronologyConverterMaskSplitter from "./ChronologyConverterMaskSplitter.svelte";
import UbhdIIIFMaskSplitter from "./UBHDIIIFMaskSplitter.svelte";
import UbhdObjMaskSplitter from "./UBHDObjMaskSplitter.svelte";

export const componentMapping = {
  "chronology-converter-mask-splitter": ChronologyConverterMaskSplitter,
  "ubhd-obj-mask-splitter": UbhdObjMaskSplitter,
  "ubhd-iiif-mask-splitter": UbhdIIIFMaskSplitter,
};

export const requiresEndMapping = {
  "chronology-converter-mask-splitter": true,
  "ubhd-obj-mask-splitter": false,
  "ubhd-iiif-mask-splitter": false,
}