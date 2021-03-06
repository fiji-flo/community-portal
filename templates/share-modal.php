<?php
/**
 * Share
 *
 * Share modal template
 *
 * @package WordPress
 * @subpackage community-portal
 * @version 1.0.0
 * @author  Playground Inc.
 */

?>
<?php

if ( ! empty( $_SERVER['REQUEST_URI'] ) && ! empty( $_SERVER['HTTP_HOST'] ) ) {
	$request_uri = esc_url_raw( wp_unslash( $_SERVER['REQUEST_URI'] ) );
	$http_host   = esc_url_raw( wp_unslash( $_SERVER['HTTP_HOST'] ) );

	$url = "{$http_host}{$request_uri}";
}

?>
<div class="lightbox__container">
	<button id="close-share-lightbox" class="btn btn--close">
		<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M25 1L1 25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			<path d="M1 1L25 25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	</button>
	<div class="share-lightbox">
		<p class="title--secondary"><?php esc_html_e( 'Share', 'community-portal' ); ?></p> 
		<ul class="share-link-container">
			<li class="share-link">
				<a href="#" id="copy-share-link" class="btn btn--light btn--share share-link__copy">
					<span class="share-link__initial"><?php esc_html_e( 'Copy share link', 'community-portal' ); ?></span>
					<span class="share-link__completed"><?php esc_html_e( 'Link copied', 'community-portal' ); ?></span>
				</a>
			</li>
			<li class="share-link">
				<a href="<?php echo esc_url_raw( 'https://www.facebook.com/sharer/sharer.php?u=' . $url ); ?>" class="btn btn--light btn--share share-link__facebook">
					<?php esc_html_e( 'Share to Facebook', 'community-portal' ); ?>
				</a>
			</li>
			<li class="share-link">
				<a href="<?php echo esc_url_raw( 'https://twitter.com/intent/tweet?url=' . $url ); ?>" class="btn btn--light btn--share share-link__twitter">
					<?php esc_html_e( 'Share to Twitter', 'community-portal' ); ?>
				</a>
			</li>
			<li class="share-link">
				<a href="<?php echo esc_url_raw( 'https://discourse.mozilla.org/new-topic?title=' . $url ); ?>" class="btn btn--light btn--share share-link__discourse">
					<?php esc_html_e( 'Share to Discourse', 'community-portal' ); ?>
				</a>
			</li>
			<li class="share-link">
				<a href="<?php echo esc_url_raw( 'https://telegram.me/share/url?url=' . $url ); ?>" class="btn btn--light btn--share share-link__telegram" >
					<?php esc_html_e( 'Share to Telegram', 'community-portal' ); ?>
				</a>
			</li>
		</ul>
	</div>
</div>
