module PushType
  class WysiwygField < PushType::FieldType

    options template: 'wysiwyg', toolbar: 'full'

    def form_helper
      :text_area
    end

    def toolbar
      @opts[:toolbar]
    end

    def html_options
      super.merge(:'v-froala' => true, :'froala-toolbar' => toolbar)
    end
    
  end
end