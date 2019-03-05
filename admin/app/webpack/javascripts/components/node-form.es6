import Vue from 'vue';
import moment from 'moment';
import slug from 'slug';

export default Vue.component('node-form', {

  props: {
    node: {
      coerce: (val) => JSON.parse(val)
    }
  },

  computed: {
    humanizedType: function() {
      return this.node.type.replace( /([A-Z])/g, (m) => ` ${ m.toLowerCase() }` ).trim();
    },

    isPublished: function() {
      return this.node.status === 'published';
    },

    draftButtonText: function() {
      if (this.node['new_record?'] || !this.node.published_at) {
        return 'Save draft';
      } else {
        return `Unpublish ${ this.humanizedType }`;
      }
    },

    publishButtonText: function() {
      if (this.node['new_record?'] || !this.node.published_at) {
        return this.publishedAtMoment.toDate() > new Date() ? 'Publish later' : 'Publish now';
      } else {
        return this.publishedAtMoment.toDate() > new Date() ? 'Save and publish on ' + this.publishedAtMoment.format('Do MMM YYYY, h:mma') : `Publish ${ this.humanizedType }`;
      }
    },

    publishedAtMoment: function() {
      return this.node.published_at ? moment(this.node.published_at) : moment();
    },

    publishedDates: function() {
      switch(this.node.status) {
        case 'draft':
          if (this.node['new_record?'] || !this.node.published_at) {
            return this.publishedAtMoment.toDate() > new Date() ? this.publishedAtMoment.format('Do MMM YYYY, h:mma') : 'Immediately'
          }
        case 'published':
          if (this.node['new_record?'] || !this.node.published_at) {
            return this.publishedAtMoment.toDate() > new Date() ? this.publishedAtMoment.format('Do MMM YYYY, h:mma') : 'Immediately';
          } else {
            return this.publishedAtMoment.format('Do MMM YYYY, h:mma');
          }
      }
    }
  },

  methods: {
    setSlug: function() {
      if (this.node['new_record?']) {
        this.node.slug = slug(this.node.title, { lower: true });
      }
    },
    cleanSlug: function() {
      this.node.slug = slug(this.node.slug, { lower: true });
    }
  }

})
