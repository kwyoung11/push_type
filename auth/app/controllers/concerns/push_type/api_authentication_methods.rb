module PushType
  module ApiAuthenticationMethods
    extend ActiveSupport::Concern

    included do
      before_action :authenticate_user!
      skip_before_action :authenticate_user!, only: [:index, :show]
      before_action :is_resource_public
    end

    protected

    def authenticate_user!
      unless current_push_type_user
        head(:unauthorized)
      end
    end

    def is_resource_public
      controller = request.controller_instance
      controller_sub_classes = ObjectSpace.each_object(Class).select { |klass| klass < controller.class && !klass.singleton_class?}
      public_resources = controller.public_resources
      if !controller_sub_classes.blank? && controller_sub_classes.first.method_defined?(:public_resources)
        public_resources = controller_sub_classes.first.new.public_resources
      end
      unless controller.controller_name == "nodes" && public_resources.include?(params[:node][:type])
        head(:unauthorized)
      end
    end

    def current_push_type_user
      @current_push_type_user ||= begin
        Knock::AuthToken.new(token: auth_token).entity_for(PushType::User)
      rescue
        nil
      end
    end

    def auth_token
      params[:token] || request.headers['Authorization'].try(:split).try(:last)
    end

  end
end