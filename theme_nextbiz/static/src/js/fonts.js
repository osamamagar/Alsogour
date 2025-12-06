/** @odoo-module **/

import fonts from "@web_editor/js/wysiwyg/fonts";
/**
 * @override
 */
(fonts.fontIcons = [
  
  { base: "fa", parser: /\.(fa-(?:\w|-)+)::?before/i },
  { base: "lnr", parser: /\.(lnr-(?:\w|-)+)::?before/i },
  { base: "icon", parser: /\.(icon-(?:\w|-)+)::?before/i },
  { base: "icofont", parser: /\.(icofont-(?:\w|-)+)::?before/i },
  { base: "lni", parser: /\.(lni-(?:\w|-)+)::?before/i },
  { base: "ri", parser: /\.(ri-(?:\w|-)+)::?before/i },
  { base: "ti", parser: /\.(ti-(?:\w|-)+)::?before/i },
]
),
  console.log();

