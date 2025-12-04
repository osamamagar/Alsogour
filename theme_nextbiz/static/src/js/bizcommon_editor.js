/** @odoo-module **/

import { renderToElement } from "@web/core/utils/render";
import  options from "@web_editor/js/editor/snippets.options";
import { rpc } from "@web/core/network/rpc";
import { _t } from "@web/core/l10n/translation";

options.registry.s_bizople_theme_blog_slider_snippet = options.Class.extend({
  xmlDependencies: ["/theme_nextbiz/static/src/xml/bizople_theme_common.xml"],

  start: function (editMode) {

    var self = this;
    this._super.apply(this, arguments);

    this.$target.removeClass("o_hidden");
    this.$target.find(".blog_slider_owl").empty();


    if (!editMode) {

      self.$el
        .find(".blog_slider_owl")
        .on("click", self.theme_nextbiz_blog_slider.bind(self));
    }
  },

  onBuilt: function () {

    var self = this;
    this._super.apply(this, arguments);

    if (this.theme_nextbiz_blog_slider()) {
      this.theme_nextbiz_blog_slider().fail(function () {
        self.getParent().removeSnippet();
      });
    }
  },
  
  cleanForSave: function () {

    $(".blog_slider_owl").empty();
  },

  theme_nextbiz_blog_slider: function (type, value) {
    
    var self = this;
    if ((type !== undefined && type.type === "click") || type === undefined) {
      const modalContent = renderToElement("theme_nextbiz.bizcommon_blog_slider_block");
      self.$modal = $(modalContent);
      self.$modal.appendTo("body");
      self.$modal.modal("show");

      var $slider_filter = self.$modal.find("#blog_slider_filter"),
        $blog_slider_cancel = self.$modal.find("#cancel"),
        $sub_data = self.$modal.find("#blog_sub_data");
      rpc("/theme_nextbiz/blog_get_options", {}).then(function (res) {
        $('#blog_slider_filter option[value!="0"]').remove();
        res.forEach((y) => {
          $("select[id='blog_slider_filter']").append(
            $("<option>", {
              value: y["id"],
              text: y["name"],
            })
          );
        });
      });

      $sub_data.on("click", function () {
        var type = "";
        self.$target.attr("data-blog-slider-type", $slider_filter.val());
        self.$target.attr(
          "data-blog-slider-id",
          "blog-myowl" + $slider_filter.val()
        );
        if ($("select#blog_slider_filter").find(":selected").text()) {
          type = _t($("select#blog_slider_filter").find(":selected").text());
        } else {
          type = _t("Blog Post Slider");
        }
        self.$target.empty().append(
          `<div class="container">
              <div class="block-title">
                  <h3 class="filter">${type}</h3>
              </div>
           </div>`
        );
      });
      $blog_slider_cancel.on("click", function () {
        self.getParent()._onRemoveClick($.Event("click"));
      });
    } else {
      return;
    }
      
  },
});

