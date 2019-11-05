class CheckController < ApplicationController
    def index
        render json: params
    end
    
end
