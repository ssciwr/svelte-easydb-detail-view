import ChronologyConverterMaskSplitter from "./ChronologyConverterMaskSplitter.svelte";
import DetailLinkedSplitter from "./DetailLinkedSplitter.svelte";
import UbhdIIIFMaskSplitter from "./UBHDIIIFMaskSplitter.svelte";
import UbhdObjMaskSplitter from "./UBHDObjMaskSplitter.svelte";

export const componentMapping = {
  "chronology-converter-mask-splitter": ChronologyConverterMaskSplitter,
  "detail-linked-mask-splitter": DetailLinkedSplitter,
  "ubhd-obj-mask-splitter": UbhdObjMaskSplitter,
  "ubhd-iiif-mask-splitter": UbhdIIIFMaskSplitter,
};

export const requiresEndMapping = {
  "chronology-converter-mask-splitter": true,
  "detail-linked-mask-splitter": false,
  "ubhd-obj-mask-splitter": false,
  "ubhd-iiif-mask-splitter": false,
}