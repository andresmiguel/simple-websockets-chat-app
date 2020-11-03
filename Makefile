copy-chat-client:
ifdef profile
	aws s3 sync chat-client s3://ab-simplechat-bucket --delete --profile $(profile)
else
	aws s3 sync chat-client s3://ab-simplechat-bucket --delete	 
endif
