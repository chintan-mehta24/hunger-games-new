Ext.define('HungerApp.model.MainActvityFeed', {
    extend: 'Ext.data.Model',
    
    config: {
		identifier: 'uuid',
        fields: [
			"message",
			"is_like",
			"user_id",
			"user_name",
			"created_at",
			"avatar_url",
			"avatar_image",
			"activity_id",
			"badge",
			"profile_image",
			"liked_by",
			"feed_comments",
			"status"
        ]
    }
});
